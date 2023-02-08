package com.TaskManagement.TM;

import com.TaskManagement.TM.controller.AuthController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TmApplication {

	//TODO
	//DELETE THIS AFTER DEBUGGING
	private static final Logger log = LoggerFactory.getLogger(TmApplication.class);
	public static void main(String[] args) {
		log.debug("starting...");
		SpringApplication.run(TmApplication.class, args);
	}

}
