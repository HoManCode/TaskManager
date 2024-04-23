package com.TaskManagement.TM.controller;
import com.TaskManagement.TM.dto.TaskDto;
import com.TaskManagement.TM.model.Tasks;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.service.TasksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Set;


@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins={"http://localhost:3000","http://localhost:8080"} , allowCredentials = "true")
public class TasksController {


    @Autowired
    private TasksService tasksService;


    @PostMapping("")
    public ResponseEntity<?> createTask(@AuthenticationPrincipal User user, @RequestBody TaskDto taskDto) {
        Tasks tasks = tasksService.create(user,taskDto);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("")
    public ResponseEntity<?> getTasks(@AuthenticationPrincipal User user){
        Set<Tasks> tasksByUsername = tasksService.findByUsername(user.getUsername());
        return ResponseEntity.ok(tasksByUsername);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTask(@PathVariable Long id,@AuthenticationPrincipal User user){
        Tasks tasks = tasksService.selectATask(id,user);
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskDto taskDto){
        Tasks updatedTasks = tasksService.update(id,taskDto);
        return ResponseEntity.ok(updatedTasks);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id,@AuthenticationPrincipal User user){
        Tasks tasks = tasksService.selectATask(id,user);
        tasksService.delete(tasks);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getTasksAdmin(@AuthenticationPrincipal User user){
        Set<Tasks> allTasks = tasksService.findAllTasks(user.getAuthorities());
        return ResponseEntity.ok(allTasks);
    }


}
