package com.TaskManagement.TM.service;
import com.TaskManagement.TM.dto.TaskDto;
import com.TaskManagement.TM.exception.ResourceNotFoundException;
import com.TaskManagement.TM.model.Authorities;
import com.TaskManagement.TM.model.Tasks;
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
public class TasksService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;


    public Tasks create(User user, TaskDto taskDto) {

        Tasks tasks = new Tasks();
        tasks.setDescription(taskDto.getDescription());
        tasks.setDueDate(taskDto.getDueDate());
        tasks.setStoryPoints(taskDto.getStoryPoints());
        tasks.setStatus(taskDto.getStatus());
        tasks.setUsername(user.getUsername());

        return taskRepository.save(tasks);
    }

    public Set<Tasks> findByUsername(String username){
        return taskRepository.findByUsername(username);
    }

    public Optional<Tasks> findById(Long id){
        return taskRepository.findById(id);
    }


    public Tasks save(Tasks tasks) {

        return taskRepository.save(tasks);
    }

    public Tasks update(Long id, TaskDto taskDto) {

        Tasks tasks = taskRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id: "+ id));

        tasks.setDescription(taskDto.getDescription());
        tasks.setDueDate(taskDto.getDueDate());
        tasks.setStoryPoints(taskDto.getStoryPoints());
        tasks.setStatus(taskDto.getStatus());

        return taskRepository.save(tasks);
    }

    public void delete(Tasks tasks) {
        taskRepository.delete(tasks);
    }

    public Set<Tasks> findAllTasks(Set<Authorities> authorities) {
        Set<Tasks> tasks = new HashSet<>();
        List<Authorities> authoritiesList = authorities.stream().filter((auth) -> auth.getAuthority().equals("ROLE_ADMIN")).collect(Collectors.toList());
        if(authoritiesList.size()>0){
            tasks.addAll(taskRepository.findAll());
        }
        return tasks;
    }

    public Tasks selectATask(Long id, User user){
        Optional<Tasks> taskOptional;
        if(userService.isAdmin(user)){
            taskOptional = findById(id);
        }else{
            Set<Tasks> tasksByUsername = findByUsername(user.getUsername());
            taskOptional = tasksByUsername.stream().filter(tas->tas.getId() == id).findFirst();
        }
        Tasks tasks = taskOptional.orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with id: "+ id));

        return tasks;
    }



}
