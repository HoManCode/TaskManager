package com.TaskManagement.TM.service;

import com.TaskManagement.TM.Enum.TaskStatus;
import com.TaskManagement.TM.model.Task;
import com.TaskManagement.TM.model.User;
import com.TaskManagement.TM.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    public Task create(User user) {

        Task task = new Task();
        task.setStatus(TaskStatus.BACKLOG);
        task.setUsername(user.getUsername());

        return taskRepository.save(task);
    }



}
