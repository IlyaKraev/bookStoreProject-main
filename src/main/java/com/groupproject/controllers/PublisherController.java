package com.groupproject.controllers;

import com.groupproject.entities.Account;
import com.groupproject.entities.Publisher;
import com.groupproject.requests.PublisherRequest;
import com.groupproject.responses.LanguageResponse;
import com.groupproject.responses.PublisherResponse;
import com.groupproject.responses.Response;
import com.groupproject.services.PublisherServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static java.util.Objects.isNull;

@Slf4j
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value ="/api/publisher")
public class PublisherController {

    @Autowired
    private PublisherServiceImpl publisherService;

    // list of the publishers -- GET method
    @GetMapping(value="/getall")
    private PublisherResponse getAll(){
        log.info("Found all the Publishers");
        return new PublisherResponse("Found all the Publishers", publisherService.getAll());
    }

    // get publisher by id -- GET method
    @GetMapping(value = "/getbyid/{id}")
    private PublisherResponse getPublisherById(@PathVariable Long id){
        if(isNull(publisherService.getById(id))){
            log.info("There is no match for this id in the DB");
            return new PublisherResponse("There is no match for this id in the DB", publisherService.getById(id));
        }
        log.info("Found the Publisher with the id {}",id);
        return new PublisherResponse("Found the Publisher",publisherService.getById(id));
    }

    // add a new publisher -- POST method
    @PostMapping(value = "/new",consumes = "application/json",
            produces = "application/json")
    private Response newPublisher(@RequestBody PublisherRequest request){
        log.info("Ready to create a new Publisher");
        publisherService.addPublisher(request);
        return new Response("The publisher has been saved");
    }

    // update a publisher by id -- PUT method
    @PutMapping(value="/update/{id}",consumes = "application/json",
            produces = "application/json")
    private Response updatePublisher(@PathVariable Long id,@RequestBody PublisherRequest request){
        log.info("ready to update a Publisher");
        Publisher publisher = publisherService.updatePublisher(id, request);
        if (isNull(publisher)) {
            return new Response("There is no inserted publisher for this id in the DB");
        }
        return new Response("The publisher has been updated");
    }

    // delete a publisher by id -- DELETE method
    @DeleteMapping(value = "/delete/{id}")
    private Response deletePublisher(@PathVariable Long id){
        log.info("Ready to delete a publisher");
        publisherService.deletePublisher(id);
        log.info("publisher successfully deleted");
        return new Response("publisher successfully deleted");
    }
}
