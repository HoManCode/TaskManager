package com.TaskManagement.TM.service;

import com.TaskManagement.TM.Enum.Authority;
import com.TaskManagement.TM.dto.UserDto;
import com.TaskManagement.TM.model.Authorities;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.repository.AuthorityRepository;
import com.TaskManagement.TM.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityRepository authorityRepository;

    public void create(UserDto userDto){
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        Authorities authority = new Authorities();
        switch (userDto.getRole()){
            case ("ADMIN"):
                authority.setAuthority(Authority.ROLE_ADMIN);
                break;
            case ("MANAGER"):
                authority.setAuthority(Authority.ROLE_MANAGER);
                break;
            case ("EMPLOYEE"):
                authority.setAuthority(Authority.ROLE_EMPLOYEE);
                break;
        }
        userRepository.save(user);
        authority.setUser(user);
        authorityRepository.save(authority);
    }

}
