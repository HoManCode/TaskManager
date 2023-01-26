package com.TaskManagement.TM.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="story_points")
    private int storyPoints;
    @Column(name="due_date")
    private Date dueDate;
    @ManyToOne(fetch= FetchType.LAZY)
    @JsonIgnore
    private Employee assignee;
    private String description;

    public Task() {

    }

    public Task(int storyPoints, Date dueDate, Employee assignee, String description) {
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

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Employee getAssignee() {
        return assignee;
    }

    public void setAssignee(Employee assignee) {
        this.assignee = assignee;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
