package com.groupproject.controllers;


import com.groupproject.requests.LanguageRequest;
import com.groupproject.responses.LanguageResponse;
import com.groupproject.responses.Response;
import com.groupproject.services.LanguageServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static java.util.Objects.isNull;

@Slf4j
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value="/api/language")
public class LanguageController {

    @Autowired
    private LanguageServiceImpl languageService;

    // list of all languages -- GET method
    @GetMapping(value="/getall")
    public LanguageResponse getAll(){
        log.info("Found all the languages");
        return new LanguageResponse("Found all the languages", languageService.getAll());
    }

    // get language by id -- GET method
    @GetMapping(value="/getbyid/{id}")
    public LanguageResponse getById(@PathVariable Long id){
        if (isNull(languageService.getById(id))){
            log.info("There is no match for this id {}",id);
            return new LanguageResponse("There is no match for this id in the database", languageService.getById(id));
        }
        log.info("Found the language with id {}",id);
        return new LanguageResponse("Found the language", languageService.getById(id));
    }

    // add a new language -- POST method
    @PostMapping(value="/new",consumes = "application/json",
            produces = "application/json")
    public Response newLanguage(@RequestBody LanguageRequest request){
        log.info("Ready to create a new language");
        languageService.newLanguage(request);
        return new Response("The language has been saved");
    }

    // delete a language -- DELETE method
    @DeleteMapping(value="/delete/{id}")
    public Response deleteLanguage(@PathVariable Long id){
        log.info("Ready to delete a language");
        languageService.deleteLanguage(id);
        return new Response("The language has been successfully deleted");
    }

}
