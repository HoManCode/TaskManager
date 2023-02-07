package com.TaskManagement.TM.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class JwtUtil implements Serializable {

    private static final long serialVersionUID = -2550185165626007488L;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;
}
