package com.TaskManagement.TM.controller;

import com.TaskManagement.TM.dto.UserDto;
import com.TaskManagement.TM.exception.ResourceNotFoundException;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.repository.UserRepository;
import com.TaskManagement.TM.service.UserService;
import com.TaskManagement.TM.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins={"http://localhost:3000"," "} , allowCredentials = "true")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    private ResponseEntity<?> createUser(@RequestBody UserDto userDto){
        userService.create(userDto);
        try{
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userDto.getUsername(),userDto.getPassword()
                    )
            );
            User user = (User) authenticate.getPrincipal();
            user.setPassword(null);
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtUtil.generateToken(authenticate)
                    ).body(user);
        } catch (BadCredentialsException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    //get all employee
    @GetMapping("")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //create user rest api
    @PostMapping("")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    //get user by id
    @GetMapping("/{id}")
    public ResponseEntity<User> getEmployeeById(@PathVariable Long id){
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id: "+ id));
        return ResponseEntity.ok(user);
    }

    //update user by id
    @PutMapping("/{id}")
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
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){

        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User does exist with id: "+ id));
        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();

        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }





}
