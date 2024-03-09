package com.TaskManagement.TM.api.controller;

import com.TaskManagement.TM.controller.UserController;
import com.TaskManagement.TM.dto.UserDto;
import com.TaskManagement.TM.model.Authorities;
import com.TaskManagement.TM.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatcher;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.nio.charset.StandardCharsets;
import java.util.HashSet;

import static com.TaskManagement.TM.Enum.Authority.ROLE_ADMIN;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = UserController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class UserControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserDto userDto;

    @BeforeEach
    public void init(){
        userDto = UserDto.builder().firstName("Ho").lastName("sh").username("lo").password("pass").role(new HashSet<>(ROLE_ADMIN.ordinal())).build();
    }

    @Test
    void createUserTest() throws Exception {
    Mockito.when(userService.create(Mockito.any(UserDto.class))).thenReturn(userDto);

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


}
