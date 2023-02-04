package com.TaskManagement.TM.controller;

import com.TaskManagement.TM.exception.ResourceNotFoundException;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@RestController
@RequestMapping("/api/")
@CrossOrigin(origins={"http://localhost:3000","http://localhost:8080"} , allowCredentials = "true")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    //get all employee
    @GetMapping("users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //create user rest api
    @PostMapping("users")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    //get user by id
    @GetMapping("users/{id}")
    public ResponseEntity<User> getEmployeeById(@PathVariable Long id){
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id: "+ id));
        return ResponseEntity.ok(user);
    }

    //update user by id
    @PutMapping("users/{id}")
    public ResponseEntity<User> updateEmployee(@PathVariable Long id, @RequestBody User userDetails){
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id: "+ id));

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());

        User updatedUser = userRepository.save(user);

        return ResponseEntity.ok(updatedUser);
    }

    //delete user by id
    @DeleteMapping("users/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){

        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User does exist with id: "+ id));
        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();

        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }





}
