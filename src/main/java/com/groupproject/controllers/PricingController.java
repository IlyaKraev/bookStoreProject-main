package com.groupproject.controllers;

import com.groupproject.requests.PricingRequest;
import com.groupproject.responses.PricingResponse;
import com.groupproject.responses.Response;
import com.groupproject.services.PricingServiceImpl;
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
@RequestMapping(value="/api/pricing")
public class PricingController {

    @Autowired
    private PricingServiceImpl pricingService;

    // list of all the prices
    @GetMapping(value="/getall")
    public PricingResponse getAll(){
        log.info("Ready to get the pricing list");
        return new PricingResponse("Found all the prices", pricingService.getAll());
    }

    // price by id
    @GetMapping(value="/getbyid/{id}")
    public PricingResponse getById(@PathVariable Long id){
        log.info("Ready to find the price with id {}",id);
        return new PricingResponse("Found the Price", pricingService.getPriceById(id));
    }

    // adding a price to the table
    @PostMapping(value="/new",consumes = "application/json",
            produces = "application/json")
    public Response newPrice(@RequestBody PricingRequest request){
        log.info("Ready to insert a price");
        pricingService.newPrice(request);
        return new Response("The price has been saved");
    }

    // update a price
    @PutMapping(value="/update/{id}",consumes = "application/json",
            produces = "application/json")
    public Response updatePrice(@PathVariable Long id,@RequestBody PricingRequest request){
        log.info("Ready to update a price");
        pricingService.updatePrice(id,request);
        return new Response("The price has been updated");
    }

    //delete a price
    @DeleteMapping(value="/delete/{id}")
    public Response deletePrice(@PathVariable Long id){
        log.info("Ready to delete the price with id {}",id);
        pricingService.deletePrice(id);
        return new Response("The price has been deleted");
    }

}
