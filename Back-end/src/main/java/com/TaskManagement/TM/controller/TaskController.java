package com.TaskManagement.TM.controller;

import com.TaskManagement.TM.dto.TaskDto;
import com.TaskManagement.TM.model.Task;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.service.TaskService;
import com.TaskManagement.TM.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins={"http://localhost:3000","http://localhost:8080"} , allowCredentials = "true")
public class TaskController {


    @Autowired
    private TaskService taskService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("")
    public ResponseEntity<?> createTask(@AuthenticationPrincipal User user, @RequestBody TaskDto taskDto) {
        Task task  = taskService.create(user,taskDto);

        return ResponseEntity.ok(task);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllTasks(@AuthenticationPrincipal User user){
        Set<Task> tasksByUsername = taskService.findByUsername(user.getUsername());

        return ResponseEntity.ok(tasksByUsername);
    }


}
