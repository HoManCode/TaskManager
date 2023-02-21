package com.TaskManagement.TM.repository;

import com.TaskManagement.TM.model.Task;
import com.TaskManagement.TM.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Set<Task> findByUsername(String username);
}
