package com.groupproject.services;

import com.groupproject.entities.Account;
import com.groupproject.entities.PurchaseHistory;
import com.groupproject.repository.AccountRepository;
import com.groupproject.repository.PurchaseHistoryRepository;
import com.groupproject.requests.PurchaseHistoryRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static java.util.Objects.isNull;

@Slf4j
@Service
public class PurchaseHistoryServiceImpl implements IPurchaseHistoryService{

    @Autowired
    private PurchaseHistoryRepository purchaseHistoryRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountServiceImpl accountServiceImpl;
    // list of all purchases
    @Override
    public List<PurchaseHistory> getAll() {
        log.info("Ready to find all the purchases");
        return purchaseHistoryRepository.findAll();
    }

    // purchase by id
    @Override
    public PurchaseHistory getById(Long id) {
        log.info("Ready to find the purchase ith id {}",id);
        return purchaseHistoryRepository.findById(id).orElse(null);
    }

    // new purchase
    @Override
    public void newPurchase(PurchaseHistoryRequest request) {
        Long accountId=request.getAccountId();
        Account account = accountRepository.findById(accountId).orElse(null);
        if(isNull(account)){
            log.info("Could not found the account");
        }
        log.info("Ready to create a new Purchase");
        PurchaseHistory purchaseHistory = new PurchaseHistory(request.getPurchaseDate(), request.getEurosSpent(), request.getPurchasedCoins(), account);
        purchaseHistoryRepository.save(purchaseHistory);
        log.info("The new purchase has been inserted to the DB");
        log.info("Updating account total coins");
            // TODO:adding coins to the account-done. is it ok though?
//         //   double x= purchaseHistory.getPurchasedCoins();
        account = accountServiceImpl.updateAccount(accountId,purchaseHistory.getPurchasedCoins()+account.getCoins());
        accountRepository.save(account);
        // TODO:adding euros to our bank and subtract them from clients bank account
    }

    // update purchase by id
    @Override
    public PurchaseHistory updatePurchase(Long id, PurchaseHistoryRequest request) {
        log.info("Ready to update a Purchase");
        PurchaseHistory purchaseHistory=purchaseHistoryRepository.findById(id).orElse(null);
        if (isNull(purchaseHistory)){
            log.info("The Purchase does not exists");
        }
        //testing
        Long accountId=request.getAccountId();
        Account account = accountRepository.findById(accountId).orElse(null);
        double coinsBeforeUpdate=purchaseHistory.getPurchasedCoins();
        purchaseHistory.setPurchaseDate(request.getPurchaseDate());
        purchaseHistory.setEurosSpent(request.getEurosSpent());
        purchaseHistory.setPurchasedCoins(request.getPurchasedCoins());
        purchaseHistory.setAccount(account);
        PurchaseHistory updatedPurchaseHistory=purchaseHistoryRepository.save(purchaseHistory);
        double coinsAfterUpdate=purchaseHistory.getPurchasedCoins();
        if(coinsAfterUpdate>coinsBeforeUpdate){
            log.info("Updating account total coins");
            account = accountServiceImpl.updateAccount(accountId,account.getCoins()+(coinsAfterUpdate-coinsBeforeUpdate));
            accountRepository.save(account);
        }
        else if(coinsAfterUpdate<coinsBeforeUpdate){
            log.info("Updating account total coins");
            account = accountServiceImpl.updateAccount(accountId,account.getCoins()-(coinsBeforeUpdate-coinsAfterUpdate));
            accountRepository.save(account);
        }
        log.info("Purchase has been updated");
        // TODO:adding or subtracting euros to our bank and the opposite from clients bank account
        return updatedPurchaseHistory;
    }

    // delete a purchase by id probably not needed
    @Override
    public boolean deletePurchase(Long id) {
        log.info("Ready to delete a purchase with the id {}",id);
        if (purchaseHistoryRepository.existsById(id)){
            Long accountId=purchaseHistoryRepository.findById(id).orElse(null).getAccount().getAccountId();
            Account account = accountRepository.findById(accountId).orElse(null);
            double minusCoins=purchaseHistoryRepository.findById(id).orElse(null).getPurchasedCoins();
//          double eurosReturned=purchaseHistoryRepository.findById(id).orElse(null).getEurosSpent();
            purchaseHistoryRepository.deleteById(id);
            log.info("Purchase has been deleted successfully");
            log.info("Updating account total coins");
            account = accountServiceImpl.updateAccount(accountId,account.getCoins()-minusCoins);
            accountRepository.save(account);
            // TODO:subtracting euros from our bank and adding them to the client
            return true;
        }
        log.info("Purchase has not been deleted successfully");
        return false;
    }

}
