# Task Manager

Hello there! Welcome to the task manager. This task manager provides users with the ability to manage tasks efficiently.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This task manager allows users to sign in, create, read, update, and delete tasks. Users with administrative privileges can create credentials for others, while those in management positions can assign tasks to team members. All users can modify task details such as due dates, descriptions, status, and story points.

## Features

- **Sign Up**: If you're a new user, sign up for an account.
- **Sign In**: Once signed up, log in to your account.
- **Create Tasks**: As a user, you can create, read, update, or delete tasks.
- **Admin Privileges**: Users with administrative privileges can create credentials for other users.
- **Management Accounts**: Users in management positions can assign tasks to other users.
- **Task Modification**: All users can modify the due dates, descriptions, status, and story points of tasks.

## Demo

## Prerequisites

Before you begin, ensure you have the following installed:

- [Java 17](https://www.oracle.com/au/java/technologies/downloads/#java17)
- [MySQL](https://www.mysql.com/downloads/)
- [Node.js](https://nodejs.org/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HoManCode/TaskManager.git
   cd Task Manager

## Configuration

 **MySQL Configuration**

To create a local MySQL database for your Spring Boot Java project, you'll need to follow these steps:

1. **Install MySQL**: If you haven't already, download and install MySQL on your local machine. You can download MySQL from the official website: [MySQL Downloads](https://www.mysql.com/downloads/).
2. **Start MySQL Server**: After installation, start the MySQL server on your local machine.
3. **Access MySQL Command Line**: You can access the MySQL command line interface using the MySQL command-line tool or any other graphical user interface (GUI) tool such as MySQL Workbench.
4. **Create Database**: Use the MySQL command line or GUI tool to create a new database for your Spring Boot project. You can use a command like this:

	```bash
   	CREATE DATABASE your_database_name;
Replace your_database_name with the desired name for your database.
5. **Configure Spring Boot Application**: In your Spring Boot project, navigate to the application.properties or application.yml file located in the src/main/resources directory.

- For *application.properties*, add the following configuration:

	```bash
   	spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name?useSSL=false
	spring.datasource.username=your_mysql_username
	spring.datasource.password=your_mysql_password
	spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
	spring.jpa.hibernate.ddl-auto=update

- For *application.yml*, add the following configuration:

	```bash

	spring:
  		datasource:
    		url: jdbc:mysql://localhost:3306/your_database_name?useSSL=false
    		username: your_mysql_username
    		password: your_mysql_password
    		driver-class-name: com.mysql.cj.jdbc.Driver
  	jpa:
    	hibernate:
      		ddl-auto: update

Replace *'your_database_name'*, *'your_mysql_username'*, and *'your_mysql_password'* with your actual MySQL database name, username, and password, respectively.

6. **Dependency**: Ensure you have the MySQL Connector/J dependency added to your *'pom.xml'* file if you're using Maven:

	```bash
	<dependency>
    	<groupId>mysql</groupId>
    	<artifactId>mysql-connector-java</artifactId>
    	<version>8.0.27</version> <!-- Replace with the latest version -->
	</dependency>
Or, if you're using Gradle, add the appropriate dependency to your build.gradle file.

7. **Run Spring Boot Application**: Now, you can run your Spring Boot application. It should connect to the local MySQL database you've configured.

That's it! You've successfully configured a local MySQL database for your Spring Boot Java project.
## Usage

1. start the server

    ```bash
    run your Spring Boot application
  

2. start the client

    ```bash
    cd Front-end
    npm start

Visit http://localhost:3000 in your browser to view the Task Manager project.

## Contributing

Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.
