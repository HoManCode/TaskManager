package com.TaskManagement.TM.controller;
import com.TaskManagement.TM.dto.TaskDto;
import com.TaskManagement.TM.exception.ResourceNotFoundException;
import com.TaskManagement.TM.model.Authorities;
import com.TaskManagement.TM.model.Task;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.service.TaskService;
import com.TaskManagement.TM.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins={"http://localhost:3000","http://localhost:8080"} , allowCredentials = "true")
public class TaskController {


    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;


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
        Optional<Task> taskOptional;
        if(userService.isAdmin(user)){
            taskOptional = taskService.findById(id);
        }else{
            Set<Task> tasksByUsername = taskService.findByUsername(user.getUsername());
            taskOptional = tasksByUsername.stream().filter(tas->tas.getId() == id).findFirst();
        }
        Task task = taskOptional.orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id: "+ id));
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id,
                                        @RequestBody TaskDto taskDto){
        Task updatedTask = taskService.update(id,taskDto);

        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id,@AuthenticationPrincipal User user){
        Optional<Task> taskOptional;
        if(userService.isAdmin(user)){
            taskOptional = taskService.findById(id);
        }else{
            Set<Task> tasksByUsername = taskService.findByUsername(user.getUsername());
            taskOptional = tasksByUsername.stream().filter(tas->tas.getId() == id).findFirst();
        }
        Task task = taskOptional.orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id: "+ id));
        taskService.delete(task);
        return ResponseEntity.ok(task);
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getTasksAdmin(@AuthenticationPrincipal User user){
        Set<Task> allTasks = taskService.findAllTasks(user.getAuthorities());
        return ResponseEntity.ok(allTasks);
    }


}
