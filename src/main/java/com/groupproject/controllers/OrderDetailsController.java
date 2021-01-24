package com.groupproject.controllers;

import com.groupproject.requests.OrderDetailsRequest;
import com.groupproject.responses.OrderDetailsResponse;
import com.groupproject.responses.Response;
import com.groupproject.services.OrderDetailsServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = " * ", allowedHeaders = " * ")
@RequestMapping(value = "/api/orderdetails")
@RestController
public class OrderDetailsController {

    @Autowired
    private OrderDetailsServiceImpl orderDetailsServiceImpl;

    // list of all the OrderDetails
    @GetMapping(value = "/getall")
    public OrderDetailsResponse getAll() {

        log.info("Ready to find all the OrderDetails");
        return new OrderDetailsResponse("Found all the OrderDetails", orderDetailsServiceImpl.getAll());
    }

    // get OrderDetails by id
    @GetMapping(value = "/getbyid/{id}")
    public OrderDetailsResponse getById(@PathVariable Long id) {
        log.info("Ready to find order details by id");
        return new OrderDetailsResponse("Found the OrderDetails", orderDetailsServiceImpl.getOrderDetailsById(id));
    }

    // get OrderDetails by OrderId
    @GetMapping(value="/getbyorderid/{orderId}",produces="application/json")
    public OrderDetailsResponse getByOrderId(@PathVariable Long orderId) {
        if (orderDetailsServiceImpl.getOrderDetailsByOrderId(orderId).size() == 0) {
            log.info("No order details with the given order id {} found", orderId);
            return new OrderDetailsResponse("No order details with the given order id found", orderDetailsServiceImpl.getOrderDetailsByOrderId(orderId));
        } else {
            log.info("Ready to find order details by orderId {}", orderId);
            return new OrderDetailsResponse("Found the Order details", orderDetailsServiceImpl.getOrderDetailsByOrderId(orderId));
        }
    }

    //create new OrderDetails
    @PostMapping(value = "/new", consumes = "application/json",
            produces = "application/json")
    public Response createNewOrderDetails(@RequestBody OrderDetailsRequest request) {

        log.info("Ready to create a new OrderDetail");
        boolean result=orderDetailsServiceImpl.createOrderDetails(request);
        if(result==false){
            return new Response("Not enough coins to place the order");
        }
        return new Response("The OrderDetails have been saved");
    }

//    // update OrderDetails with id
//    @PutMapping(value = "/update/{id}", consumes = "application/json", produces = "application/json")
//    public Response updateExistingOrderDetails(@PathVariable(value = "id") Long id,
//            @RequestBody OrderDetailsRequest request) {
//
//        log.info("ready to update an OrderDetails");
//        orderDetailsServiceImpl.updateOrderDetails(id, request);
//        return new Response("The OrderDetails have been updated");
//    }

    // delete OrderDetails by id
    @DeleteMapping("/delete/{id}")
    public Response deleteOrderDetails(@PathVariable Long id) {

        log.info("Ready to delete an OrderDetails");
        orderDetailsServiceImpl.deleteById(id);
        return new Response("The OrderDetails have been deleted");
    }
}
