package com.TaskManagement.TM.controller;

import com.TaskManagement.TM.controller.UserController;
import com.TaskManagement.TM.dto.UserDto;
import com.TaskManagement.TM.model.Authorities;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.repository.UserRepository;
import com.TaskManagement.TM.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static com.TaskManagement.TM.Enum.Authority.ROLE_ADMIN;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(controllers = UserController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:application-test.properties")
public class UserControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private UserController userController;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDto userDto;

    @BeforeEach
    public void init(){
        userDto = UserDto.builder().firstName("Ho").lastName("sh").username("lo").password("pass").role(new HashSet<>(ROLE_ADMIN.ordinal())).build();
    }

    @Test
    void createUserTest() throws Exception {
    when(userService.create(Mockito.any(UserDto.class))).thenReturn(userDto);

    MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/users/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(userDto).getBytes(StandardCharsets.UTF_8))
                    .accept(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk())
            .andReturn();

    Assertions.assertThat(result).isNotNull();
    String userJson = result.getResponse().getContentAsString();
    Assertions.assertThat(userJson).isNotEmpty();
    Assertions.assertThat(userJson).isEqualToIgnoringCase(objectMapper.writeValueAsString(userDto));
}

    @Test
    public void getUsersByAdmin_ReturnsAllUsers() {
        // Mock authenticated user
        User authenticatedUser = new User("admin", "", Collections.singleton(new Authorities("ROLE_ADMIN")));

        // Mock service response
        Set<User> mockUsers = Collections.singleton(new User("user1", "", Collections.singleton(new Authorities("ROLE_ADMIN"))));
        when(userService.findAllUsers(authenticatedUser.getAuthorities())).thenReturn(mockUsers);

        // Call the controller method
        ResponseEntity<?> responseEntity = userController.getUsersByAdmin(authenticatedUser);

        // Verify that userService.findAllUsers is called with correct arguments
        verify(userService).findAllUsers(authenticatedUser.getAuthorities());

        // Verify the response entity
        assert responseEntity.getStatusCode() == HttpStatus.OK;
        assert Objects.equals(responseEntity.getBody(), mockUsers);
    }


}
