package com.TaskManagement.TM.util;

import com.TaskManagement.TM.model.User;

public class AuthorityUtil {

    public static Boolean hasRole(String role, User user){
        return user.getAuthorities()
                .stream()
                .filter(auth -> auth.getAuthority().equals(role))
                .count() > 0;
    }
}
