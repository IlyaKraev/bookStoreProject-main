package com.groupproject.controllers;


import com.groupproject.entities.Author;
import com.groupproject.requests.AuthorRequest;
import com.groupproject.responses.AuthorResponse;
import com.groupproject.responses.Response;
import com.groupproject.services.AuthorServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static java.util.Objects.isNull;

@Slf4j
@RestController
@RequestMapping(value="/api/author")
public class AuthorController {

    @Autowired
    private AuthorServiceImpl authorService;

    // get all the authors
    @GetMapping(value="/getall")
    public AuthorResponse getAll(){
        log.info("Ready to find all the Authors");
        return new AuthorResponse("Found all the authors", authorService.getAll());
    }

    // get author by id
    @GetMapping(value="/getbyid/{id}")
    public AuthorResponse getById(@PathVariable Long id){
        log.info("Ready to find the Author with id{}",id);
        return new AuthorResponse("Found the Author with the given id", authorService.getAuthorById(id));
    }

    // insert new Author
    @PostMapping(value="/new",consumes = "application/json",
            produces = "application/json")
    public Response newAuthor(@RequestBody AuthorRequest request){
        authorService.newAuthor(request);
        log.info("Ready to insert a new Author");
        return new Response("The new Author has been saved");
    }

    @PutMapping(value="/update/{id}",consumes = "application/json", produces = "application/json")
    public Response updateExistingAuthor(@PathVariable(value = "id") Long id,
                                         @RequestBody AuthorRequest request){
        log.info("ready to update an author");
        Author author = authorService.updateAuthor(id, request);
        if (isNull(author)) {
            return new Response("There is no such author");
        }
        return new Response("The author has been updated");
    }

    // delete account by id
    @DeleteMapping("/delete/{id}")
    public Response deleteAuthor(@PathVariable Long id){
        log.info("Ready to delete an author");
        authorService.deleteAuthor(id);
        return new Response("The author has been deleted");
    }
}
