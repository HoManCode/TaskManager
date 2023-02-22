package com.TaskManagement.TM.service;

import com.TaskManagement.TM.Enum.TaskStatus;
import com.TaskManagement.TM.dto.TaskDto;
import com.TaskManagement.TM.model.Task;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
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



}
