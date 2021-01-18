package com.groupproject.controllers;

import com.groupproject.repository.AccountRepository;
import com.groupproject.requests.CategoryRequest;
import com.groupproject.responses.CategoryResponse;
import com.groupproject.responses.Response;
import com.groupproject.services.CategoryServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value="/api/category")
public class CategoryController {
    @Autowired
    private AccountRepository accountRepository;//??????

    @Autowired
    private CategoryServiceImpl categoryService;

    // list of the categories -- GET method
    @GetMapping(value="/getall")
    public CategoryResponse getAll(){
        log.info("Ready to find all the categories");
        return new CategoryResponse("Found all the categories", categoryService.getAll());
    }

    // get category by id -- GET method
    @GetMapping(value="/getbyid/{id}")
    public CategoryResponse getById(@PathVariable Long id){
        log.info("Ready to find the category with the id {}",id);
        return  new CategoryResponse("Found the category ", categoryService.getById(id));
    }

    // create new category -- POST method
    @PostMapping(value="/new",consumes = "application/json",
            produces = "application/json")
    public Response createCategory(@RequestBody CategoryRequest request){
        log.info("ready to create a new category");
        categoryService.createNewCategory(request);
        return new Response("The category has been saved");
    }

    // delete a category -- DELETE method
    @DeleteMapping(value="/delete/{id}")
    public Response deleteCategory(@PathVariable Long id){
        log.info("Ready to delete a category");
        categoryService.deleteCategoryById(id);
        return new Response("The category has been deleted successfully");
    }

}
