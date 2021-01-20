package com.groupproject.controllers;

import static java.util.Objects.isNull;

import com.groupproject.entities.PurchaseHistory;
import com.groupproject.requests.PurchaseHistoryRequest;
import com.groupproject.responses.PurchaseHistoryResponse;
import com.groupproject.responses.Response;
import com.groupproject.services.PurchaseHistoryServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
//@CrossOrigin(origins = " * ", allowedHeaders = " * ")
@RestController
@RequestMapping(value="/api/purchasehistory")
public class PurchaseHistoryController {

    @Autowired
    private PurchaseHistoryServiceImpl purchaseHistoryService;

    // list of the purchases -- GET method
    @GetMapping(value="/getall")
    public PurchaseHistoryResponse getAll(){
        log.info("Found all the purchases");
        return new PurchaseHistoryResponse("Found all the purchases", purchaseHistoryService.getAll());
    }

    // get purchase by id -- GET method
    @GetMapping(value="/getbyid/{id}")
    public PurchaseHistoryResponse getById(@PathVariable Long id){
        if(isNull(purchaseHistoryService.getById(id))){
            log.info("There is no match for this id in the DB");
            return new PurchaseHistoryResponse("There is no match for this id in the DB", purchaseHistoryService.getById(id));
        }
        log.info("Ready to find the purchase with id {}",id);
        return new PurchaseHistoryResponse("Found the purchase", purchaseHistoryService.getById(id));
    }

    // create new purchase -- POST method
    @PostMapping(value = "/new",consumes = "application/json",
            produces = "application/json")
    public Response newPurchase(@RequestBody PurchaseHistoryRequest request){
        log.info("Ready to create a new purchase");
        purchaseHistoryService.newPurchase(request);
        return new Response("The purchase has been saved");
    }

    // update an existing purchase by id -- PUT method
    @PutMapping(value="/update/{id}",consumes = "application/json",
            produces = "application/json")
    public Response updatePurchase(@PathVariable Long id,@RequestBody PurchaseHistoryRequest request){
        log.info("Ready to update a purchase with id {}",id);
        PurchaseHistory purchaseHistory=purchaseHistoryService.updatePurchase(id,request);
        if(isNull(purchaseHistory)){
            log.info("There is no inserted Purchase in the DB with this id {}",id);
            return new Response("There is no inserted Purchase in the DB with this id");
        }
        log.info("The Purchase has been updated");
        return new Response("The purchase has been updated");
    }

    // delete a purchase by id -- DELETE method
    @DeleteMapping(value="/delete/{id}")
    public Response deletePurchase(@PathVariable Long id){
        log.info("Ready to delete the purchase with id {}",id);
        if(isNull(purchaseHistoryService.getById(id))){
            log.info("There is no match in the DB with this id to be deleted");
            return new Response("There is no match in the DB with this id to be deleted");
        }
        purchaseHistoryService.deletePurchase(id);
        log.info("Purchase successfully deleted");
        return new Response("Purchase successfully deleted");
    }


}
