package com.groupproject.services;

import com.groupproject.entities.Order;
import com.groupproject.entities.OrderDetails;
import com.groupproject.receipts.Receipt;
import com.groupproject.repository.AccountRepository;
import com.groupproject.repository.OrderDetailsRepository;
import com.groupproject.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ReceiptImpl implements IReceiptService{

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Override
    public Receipt getReceiptByOrderId(Long orderId) {
        log.info("Ready to create a new ReceiptController for the client");
        List<OrderDetails> orderDetails=orderDetailsRepository.findByOrder_OrderId(orderId);
        log.info("Taking all the fields we want to show from the order");
        Order order=orderRepository.findById(orderId).orElse(null);
        String lastname=order.getAccount().getLastName();
        String firstname=order.getAccount().getFirstName();
        Long orderId1=order.getOrderId();
        LocalDateTime orderDate=order.getOrderDate();
        Double totalCoins=order.getTotalCoins();
        List<Double> originalPrices=new ArrayList<>();
        List<Double> discountRates=new ArrayList<>();
        List<Double> totalPrices=new ArrayList<>();
        List<String> titles=new ArrayList<>();
        log.info("Taking all the fields i want to show from the order details of this order");
        for(OrderDetails current:orderDetails){
            Double originalPrice=current.getOriginalPrice();
            Double discountRate=current.getDiscountRate();
            Double totalPrice=current.getTotalPrice();
            String title=current.getBook().getTitle();
            originalPrices.add(originalPrice);
            discountRates.add(discountRate);
            titles.add(title);
            totalPrices.add(totalPrice);
        }
        log.info("Ready to return a new receipt");
        return new Receipt(lastname,firstname,orderId1,titles,originalPrices,discountRates,totalPrices,orderDate,totalCoins);
    }
}
