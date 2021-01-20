package com.groupproject.controllers;

import com.groupproject.requests.BookRequest;
import com.groupproject.responses.BookResponse;
import com.groupproject.responses.Response;
import com.groupproject.services.BookServiceImpl;
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
@RequestMapping(value="/api/book")
public class BookController {

    @Autowired
    private BookServiceImpl bookService;

    // list of all the books
    @GetMapping(value="/getall",produces="application/json")
    public BookResponse getAllBooks(){
        log.info("Ready to find all the books");
        return new BookResponse("Found all the books",bookService.getAll());
    }

    // get book by id
    @GetMapping(value="/getbyid/{id}")
    public BookResponse getById(@PathVariable Long id){
        log.info("Ready to find the book with the id {}",id);
        return new BookResponse("Found the book", bookService.getBookById(id));
    }

    // create a new book with post method
    @PostMapping(value="/new",consumes = "application/json",
            produces = "application/json")
    public Response createNewBook(@RequestBody BookRequest request){
        log.info("Ready to create a new book");
        log.info("The request is {}", request.toString());
        bookService.createNewBook(request);
        return new Response("The Book has been saved");
    }

    // update a book with ID with put method
    @PutMapping(value="/update/{id}",consumes = "application/json",
            produces = "application/json")
    public Response updateBook(@PathVariable Long id,@RequestBody BookRequest request){
        log.info("Ready to update the book with the id {}",id);
        bookService.updateBook(id,request);
        return new Response("The Book has been updated");
    }

    // delete a book with ID with delete method
    @DeleteMapping(value="/delete/{id}")
    public Response deleteBook(@PathVariable Long id){
        log.info("Ready to delete the book with id {}",id);
        bookService.deleteBookById(id);
        return new Response("The Book has been deleted");
    }


}
