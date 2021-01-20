package com.groupproject.controllers;

import static java.util.Objects.isNull;

import com.groupproject.entities.Role;
import com.groupproject.requests.RoleRequest;
import com.groupproject.responses.Response;
import com.groupproject.responses.RoleResponse;
import com.groupproject.services.RoleServiceImpl;
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
@RequestMapping(value="/api/role")
public class RoleController {
    @Autowired
    private RoleServiceImpl roleService;

     // list of all roles -- GET method
     @GetMapping(value="/getall")
     public RoleResponse getAll(){
         log.info("Found all the roles");
         return new RoleResponse("Found all the roles", roleService.getAll());
     }

     // get role by id -- GET method
     @GetMapping(value="/getbyid/{id}")
     public RoleResponse getById(@PathVariable Long id){
         if (isNull(roleService.getById(id))){
             log.info("There is no match for a role for this id {}",id);
             return new RoleResponse("There is no match for this id in the database", roleService.getById(id));
         }
         log.info("Found the role with id {}",id);
         return new RoleResponse("Found the role", roleService.getById(id));
     }

     // add a new role -- POST method
     @PostMapping(value="/new",consumes = "application/json", produces = "application/json")
     public Response newRole(@RequestBody RoleRequest request){
         log.info("Ready to create a new role");
         roleService.newRole(request);
         return new Response("The role has been saved");
     }

     // update role with id
     @PutMapping(value="/update/{id}",consumes = "application/json", produces = "application/json")
     public Response updateExistingRole(@PathVariable(value = "id") Long id, @RequestBody RoleRequest request){
         log.info("ready to update a role");
         Role role = roleService.updateRole(id, request);
         if (isNull(role)) {
             return new Response("There is no such role");
         }
         return new Response("The role has been updated");
     }
     // delete a role -- DELETE method
     @DeleteMapping(value="/delete/{id}")
     public Response deleteRole(@PathVariable Long id){
         log.info("Ready to delete a role");
         roleService.deleteRole(id);
         return new Response("The role has been successfully deleted");
     }
}
