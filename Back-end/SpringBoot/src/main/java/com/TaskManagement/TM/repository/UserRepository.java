package com.TaskManagement.TM.repository;

import com.TaskManagement.TM.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository <User, Long>{
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);

    Optional<User> findById(Long id);
}
