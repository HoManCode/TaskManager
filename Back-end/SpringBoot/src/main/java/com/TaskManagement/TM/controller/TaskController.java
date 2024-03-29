package com.TaskManagement.TM.controller;
import com.TaskManagement.TM.dto.TaskDto;
import com.TaskManagement.TM.model.Task;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.service.TaskService;
import com.TaskManagement.TM.service.UserService;
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


    @PostMapping("")
    public ResponseEntity<?> createTask(@AuthenticationPrincipal User user, @RequestBody TaskDto taskDto) {
        Task task  = taskService.create(user,taskDto);
        return ResponseEntity.ok(task);
    }

    @GetMapping("")
    public ResponseEntity<?> getTasks(@AuthenticationPrincipal User user){
        Set<Task> tasksByUsername = taskService.findByUsername(user.getUsername());
        return ResponseEntity.ok(tasksByUsername);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTask(@PathVariable Long id,@AuthenticationPrincipal User user){
        Task task = taskService.selectATask(id,user);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskDto taskDto){
        Task updatedTask = taskService.update(id,taskDto);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id,@AuthenticationPrincipal User user){
        Task task = taskService.selectATask(id,user);
        taskService.delete(task);
        return ResponseEntity.ok(task);
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getTasksAdmin(@AuthenticationPrincipal User user){
        Set<Task> allTasks = taskService.findAllTasks(user.getAuthorities());
        return ResponseEntity.ok(allTasks);
    }


}
