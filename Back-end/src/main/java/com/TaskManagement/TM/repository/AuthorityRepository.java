package com.TaskManagement.TM.repository;

import com.TaskManagement.TM.model.Authorities;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authorities, Long> {
}
