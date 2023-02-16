package com.TaskManagement.TM.controller;

import ch.qos.logback.core.util.Duration;
import com.TaskManagement.TM.dto.LoginDto;
import com.TaskManagement.TM.dto.UserDto;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.repository.UserRepository;
import com.TaskManagement.TM.service.UserService;
import com.TaskManagement.TM.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:8080"} , allowCredentials = "true")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

    @Value("${cookies.domain}")
    private String domain;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto){
        if (userRepository.existsByUsername(userDto.getUsername())){
            return new ResponseEntity<>("Username is taken!!!!", HttpStatus.BAD_REQUEST);
        }
        userService.create(userDto);

        try{
            Authentication authentication = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    userDto.getUsername(),userDto.getPassword()
                            )
                    );
            User user = (User) authentication.getPrincipal();
            user.setPassword(null);
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtUtil.generateToken(user)
                    )
                    .body(user);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
        try{

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtil.generateToken(authentication);

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .domain(domain)
                .path("/")
                .maxAge(Duration.buildByDays(365).getMilliseconds())
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(token);
    } catch (BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@CookieValue(name = "jwt") String token,
                                           @AuthenticationPrincipal User user){
        try{
            boolean isValidToken = jwtUtil.ValidateUsersToken(token, user);
            return ResponseEntity.ok(isValidToken);
        } catch (ExpiredJwtException e){
            return ResponseEntity.ok(false);
        }
    }
    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = ResponseCookie.from("jwt","")
                .domain(domain)
                .path("/")
                .maxAge(0)
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString()).body("ok");
    }

}
