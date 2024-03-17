using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TMS.Models;

namespace TMS.Data;

public partial class TaskManagementSystemContext : DbContext
{
    public TaskManagementSystemContext()
    {
    }

    public TaskManagementSystemContext(DbContextOptions<TaskManagementSystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Authority> Authorities { get; set; }

    public virtual DbSet<Authority1> Authorities1 { get; set; }

    public virtual DbSet<HibernateSequence> HibernateSequences { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }

    public virtual DbSet<User> Users { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Authority>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("authorities");

            entity.HasIndex(e => e.UserId, "FKk91upmbueyim93v469wj7b2qh");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Authority1).HasColumnName("authority");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Authorities)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FKk91upmbueyim93v469wj7b2qh");
        });

        modelBuilder.Entity<Authority1>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("authority");

            entity.HasIndex(e => e.UserId, "FKka37hl6mopj61rfbe97si18p8");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Authority)
                .HasMaxLength(255)
                .HasColumnName("authority");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Authority1s)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FKka37hl6mopj61rfbe97si18p8");
        });

        modelBuilder.Entity<HibernateSequence>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("hibernate_sequence");

            entity.Property(e => e.NextVal).HasColumnName("next_val");
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("task");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.DueDate)
                .HasColumnType("date")
                .HasColumnName("due_date");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.StoryPoints).HasColumnName("story_points");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("users");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .HasColumnName("last_name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
