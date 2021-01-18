package com.groupproject.controllers;

import com.groupproject.requests.OrderDetailsRequest;
import com.groupproject.responses.OrderDetailsResponse;
import com.groupproject.responses.Response;
import com.groupproject.services.OrderDetailsServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping(value = "/api/orderdetails")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
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

    //create new OrderDetails
    @PostMapping(value = "/new", consumes = "application/json",
            produces = "application/json")
    public Response createNewOrderDetails(@RequestBody OrderDetailsRequest request) {

        log.info("Ready to create a new OrderDetail");
        orderDetailsServiceImpl.createOrderDetails(request);
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
