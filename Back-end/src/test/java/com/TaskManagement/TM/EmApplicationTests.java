package com.TaskManagement.TM;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;

@SpringBootTest
@ComponentScan(basePackages = {"com.TaskManagement.TM.Tests"})
class EmApplicationTests {

	@Test
	void contextLoads() {
	}

}
