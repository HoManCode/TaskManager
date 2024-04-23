package com.TaskManagement.TM.repository;

import com.TaskManagement.TM.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface TaskRepository extends JpaRepository<Tasks, Long> {
    Set<Tasks> findByUsername(String username);

    Optional<Tasks> findById(Long id);
}
