package com.TaskManagement.TM.repository;

import com.TaskManagement.TM.model.Authorities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends JpaRepository<Authorities, Long> {

    long deleteByUser_id(Long id);
}
