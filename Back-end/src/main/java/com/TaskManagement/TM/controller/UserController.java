package com.TaskManagement.TM.controller;

import com.TaskManagement.TM.dto.UserDto;
import com.TaskManagement.TM.exception.ResourceNotFoundException;
import com.TaskManagement.TM.model.Task;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
                            jwtUtil.generateToken(user)
                    ).body(user);
        } catch (BadCredentialsException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    //get all users by admin
    @GetMapping("/admin")
    public ResponseEntity<?> getUsersByAdmin(@AuthenticationPrincipal User user){
        Set<User> allTasks = userService.findAllUsers(user.getAuthorities());
        return ResponseEntity.ok(allTasks);
    }

    //get users by Id admin
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id,@AuthenticationPrincipal User user){
        User usr = userService.selectAUser(id,user);
        return ResponseEntity.ok(usr);
    }


    }


