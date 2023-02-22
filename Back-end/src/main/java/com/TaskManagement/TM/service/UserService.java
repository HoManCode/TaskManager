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
        userRepository.save(user);
        Authorities authority = new Authorities();
        authority.setAuthority(Authority.ROLE_EMPLOYEE);
        authority.setUser(user);
        authorityRepository.save(authority);
    }

}
