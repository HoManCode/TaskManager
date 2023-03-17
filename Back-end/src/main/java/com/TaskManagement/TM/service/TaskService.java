package com.TaskManagement.TM.service;
import com.TaskManagement.TM.dto.TaskDto;
import com.TaskManagement.TM.exception.ResourceNotFoundException;
import com.TaskManagement.TM.model.Authorities;
import com.TaskManagement.TM.model.Task;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;


    public Task create(User user, TaskDto taskDto) {

        Task task = new Task();
        task.setDescription(taskDto.getDescription());
        task.setDueDate(taskDto.getDueDate());
        task.setStoryPoints(taskDto.getStoryPoints());
        task.setStatus(taskDto.getStatus());
        task.setUsername(user.getUsername());

        return taskRepository.save(task);
    }

    public Set<Task> findByUsername(String username){
        return taskRepository.findByUsername(username);
    }

    public Optional<Task> findById(Long id){
        return taskRepository.findById(id);
    }


    public Task save(Task task) {

        return taskRepository.save(task);
    }

    public Task update(Long id, TaskDto taskDto) {

        Task task = taskRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id: "+ id));

        task.setDescription(taskDto.getDescription());
        task.setDueDate(taskDto.getDueDate());
        task.setStoryPoints(taskDto.getStoryPoints());
        task.setStatus(taskDto.getStatus());

        return taskRepository.save(task);
    }

    public void delete(Task task) {
        taskRepository.delete(task);
    }

    public Set<Task> findAllTasks(Set<Authorities> authorities) {
        Set<Task> tasks = new HashSet<>();
        List<Authorities> authoritiesList = authorities.stream().filter((auth) -> auth.getAuthority().equals("ROLE_ADMIN")).collect(Collectors.toList());
        if(authoritiesList.size()>0){
            tasks.addAll(taskRepository.findAll());
        }
        return tasks;
    }

    public Task selectATask(Long id,User user){
        Optional<Task> taskOptional;
        if(userService.isAdmin(user)){
            taskOptional = findById(id);
        }else{
            Set<Task> tasksByUsername = findByUsername(user.getUsername());
            taskOptional = tasksByUsername.stream().filter(tas->tas.getId() == id).findFirst();
        }
        Task task = taskOptional.orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id: "+ id));

        return task;
    }



}
