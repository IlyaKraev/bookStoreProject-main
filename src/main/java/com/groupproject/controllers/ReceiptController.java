package com.groupproject.controllers;

import com.groupproject.responses.ReceiptResponse;
import com.groupproject.services.ReceiptImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import static java.util.Objects.isNull;


@Slf4j
@CrossOrigin(origins = " * ", allowedHeaders = " * ")
@RestController
@RequestMapping(value="/api/receipt")
public class ReceiptController {

    @Autowired
    private ReceiptImpl receipt;

    @GetMapping(value="/{orderId}",produces="application/json")
    public ReceiptResponse getReceipt(@PathVariable Long orderId){
        log.info("Ready to print the receipt of the order with id {}",orderId);
        if (isNull(receipt.getReceiptByOrderId(orderId))){
            log.info("There is no order with this id {}",orderId);
            return new ReceiptResponse("There is no order with this id",receipt.getReceiptByOrderId(orderId));
        }else {
            log.info("The ReceiptController of the order with id {}",orderId);
            return new ReceiptResponse("The receipt of this order is:",receipt.getReceiptByOrderId(orderId));
        }
    }
}
