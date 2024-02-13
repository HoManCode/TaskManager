package com.TaskManagement.TM.service;

import com.TaskManagement.TM.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;


    public void delete(Long id) {
        authorityRepository.deleteByUser_id(id);
    }
}
