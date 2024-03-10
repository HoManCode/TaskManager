package com.TaskManagement.TM.Tests.repository;


import com.TaskManagement.TM.dto.UserDto;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.HashSet;

import static com.TaskManagement.TM.Enum.Authority.ROLE_ADMIN;

@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void init(){

    }

    @Test
    public void UserRepository_SaveAll_ReturnSavedUser(){

        //Arrange
        User user = new User("dd", "hoo",new HashSet<>(ROLE_ADMIN.ordinal()));

        //Act
        User savedUser = userRepository.save(user);

        //Assert
        Assertions.assertThat(savedUser).isNotNull();
        Assertions.assertThat(savedUser.getId()).isGreaterThan(0);
    }
}
