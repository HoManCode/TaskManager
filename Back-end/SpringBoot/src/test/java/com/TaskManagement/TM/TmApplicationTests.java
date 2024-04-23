package com.TaskManagement.TM;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
@ComponentScan(basePackages = {"com.TaskManagement.TM.*"})
class TmApplicationTests {

	@Test
	void contextLoads() {
	}

}
