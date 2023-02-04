package com.TaskManagement.TM.controller;

import com.TaskManagement.TM.model.Task;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins={"http://localhost:3000","http://localhost:8080"} , allowCredentials = "true")
public class TaskController {


    @Autowired
    private TaskService taskService;

    @PostMapping("tasks")
    public ResponseEntity<?> createTask(@AuthenticationPrincipal User user) {
        Task task  = taskService.create(user);

        return ResponseEntity.ok(task);
    }


}
