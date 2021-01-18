package com.groupproject.controllers;

import com.groupproject.requests.OrderRequest;
import com.groupproject.responses.OrderResponse;
import com.groupproject.responses.Response;
import com.groupproject.services.OrderServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/api/order")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderServiceImpl;

    //get all the orders
    @GetMapping(value = "/getall")
    public OrderResponse getall() {

        log.info("Ready to find all the orders");
        return new OrderResponse("Found the orders", orderServiceImpl.getAll());
    }

    // get order by id
    @GetMapping(value = "/getbyid/{id}")
    public OrderResponse getById(@PathVariable Long id) {

        log.info("Ready to find order by id");
        return new OrderResponse("Found the asked order", orderServiceImpl.getOrderById(id));
    }

    //create new order
    @PostMapping(value = "/new", consumes = "application/json",
            produces = "application/json")
    public Response createNewOrder(@RequestBody OrderRequest request) {

        log.info("Ready to create a new Order");
        orderServiceImpl.createOrder(request);
        return new Response("The order has been saved");
    }

//    // update order with id
//    @PutMapping(value="/update/{id}",consumes = "application/json", produces = "application/json")
//    public Response updateExistingOrder(@PathVariable(value = "id") Long id,
//                                          @RequestBody OrderRequest request){
//        log.info("ready to update an order");
//        orderServiceImpl.updateOrder(id,request);
//        return new Response("The order has been updated");
//    }

    // delete order by id
    @DeleteMapping("/delete/{id}")
    public Response deleteOrder(@PathVariable Long id) {

        log.info("Ready to delete an order");
        orderServiceImpl.deleteById(id);
        return new Response("The order has been deleted");
    }
}
