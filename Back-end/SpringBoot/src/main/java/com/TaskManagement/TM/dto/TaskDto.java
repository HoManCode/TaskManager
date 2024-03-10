package com.TaskManagement.TM.dto;

import com.TaskManagement.TM.Enum.TaskStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskDto {

    private String description;
    private LocalDate dueDate;
    private int storyPoints;
    private TaskStatus status;
}
