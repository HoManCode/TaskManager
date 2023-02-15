package com.TaskManagement.TM.model;

import com.TaskManagement.TM.Enum.TaskStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="story_points")
    private int storyPoints;
    @Column(name="due_date")
    private LocalDate dueDate;
    @ManyToOne(optional = false,cascade = CascadeType.ALL)
    private User assignee;
    private String description;

    private TaskStatus status;

    public Task() {

    }

    public Task(int storyPoints, LocalDate dueDate, User assignee, String description) {
        this.storyPoints = storyPoints;
        this.dueDate = dueDate;
        this.assignee = assignee;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getStoryPoints() {
        return storyPoints;
    }

    public void setStoryPoints(int storyPoints) {
        this.storyPoints = storyPoints;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskStatus getStatus() { return status; }

    public void setStatus(TaskStatus status) { this.status = status; }
}
