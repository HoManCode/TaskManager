package com.TaskManagement.TM.controller;

import ch.qos.logback.core.util.Duration;
import com.TaskManagement.TM.dto.LoginDto;
import com.TaskManagement.TM.dto.RegisterDto;
import com.TaskManagement.TM.Enum.Role;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.repository.UserRepository;
import com.TaskManagement.TM.security.JWTGenerator;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:8080"} , allowCredentials = "true")
@RequestMapping("/api/")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator jwtGenerator;

    @Value("${cookies.domain}")
    private String domain;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("auth/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        if (userRepository.existsByUsername(registerDto.getUsername())){
            return new ResponseEntity<>("Username is taken!!!!", HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode((registerDto.getPassword())));

        user.setRole(Role.ROLE_EMPLOYEE);

        userRepository.save(user);
        return new ResponseEntity<>("User registered success!!", HttpStatus.OK);
    }

    @PostMapping("auth/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
        try{
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

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

    @GetMapping("auth/validate")
    public ResponseEntity<?> validateToken(@CookieValue(name = "jwt") String token,
                                           @AuthenticationPrincipal User user){
        try{
            boolean isValidToken = jwtGenerator.ValidateUsersToken(token, user);
            return ResponseEntity.ok(isValidToken);
        } catch (ExpiredJwtException e){
            return ResponseEntity.ok(false);
        }
    }
    @GetMapping("auth/logout")
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
