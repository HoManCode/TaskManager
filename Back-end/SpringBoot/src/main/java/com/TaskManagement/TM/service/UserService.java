package com.TaskManagement.TM.service;

import com.TaskManagement.TM.dto.UserDto;
import com.TaskManagement.TM.exception.ResourceNotFoundException;
import com.TaskManagement.TM.model.Authorities;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.repository.AuthorityRepository;
import com.TaskManagement.TM.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.TaskManagement.TM.Enum.Authority.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityRepository authorityRepository;
    

    public UserDto create(UserDto userDto){
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        Authorities authorities = new Authorities();
        Optional<Authorities> auth = userDto.getRole().stream().findFirst();
        if(auth.isPresent()){
            switch (auth.get().toString()){
                case ("ROLE_ADMIN"):
                    authorities.setAuthority(ROLE_ADMIN);
                    break;
                case ("ROLE_MANAGER"):
                    authorities.setAuthority(ROLE_MANAGER);
                    break;
                case ("ROLE_EMPLOYEE"):
                    authorities.setAuthority(ROLE_EMPLOYEE);
                    break;
            }
        }
        HashSet<Authorities> authoritySet = new HashSet<>();
        authoritySet.add(authorities);
        user.setAuthorities(authoritySet);
        userRepository.save(user);
        authorities.setUser(user);
        authorityRepository.save(authorities);

        return userDto;
    }

    public boolean isAdmin(User user){
        List<Authorities> authoritiesList = user
                .getAuthorities()
                .stream()
                .filter((auth) -> auth.getAuthority().equals("ROLE_ADMIN"))
                .toList();

        return !authoritiesList.isEmpty();

    }


    public Set<User> findAllUsers(Set<Authorities> authorities) {
        Set<User> users = new HashSet<>();
        List<Authorities> authoritiesList = authorities.stream().filter((auth) -> auth.getAuthority().equals("ROLE_ADMIN")).collect(Collectors.toList());
        if(!authoritiesList.isEmpty()){
            users.addAll(userRepository.findAll());
        }
        return users;
    }

    public User selectAUser(Long id, User user) {
        Optional<User> userOptional=Optional.empty();
        if(isAdmin(user)){
            userOptional = findById(id);
        }
        User usr = userOptional.orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id: "+ id));
        return usr;
    }

    private Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }


    public void delete(User usr) {
        userRepository.delete(usr);
    }

    public User update(Long id, User usr, UserDto userDto) {
        usr.setFirstName(userDto.getFirstName());
        usr.setLastName(userDto.getLastName());
        usr.setUsername(userDto.getUsername());
        usr.setAuthorities(userDto.getRole());
        return userRepository.save(usr);
    }
}
