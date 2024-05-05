using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TMS.Data;
using TMS.Models;
using TMS.Repository;

namespace TMS.Controllers;

[Route("api/tasks")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly ITasksRepository _tasksRepository;

    public TasksController(ITasksRepository tasksRepository)
    {
        _tasksRepository = tasksRepository;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTaskById(int id)
    {
        if (id <= 0 )
        {
            return BadRequest("Invalid id");
        }
        var task = await _tasksRepository.GetById(id);
        if (task != null) return Ok(task);
        return NotFound("Product does not exist");
    }
    
    [HttpGet("/users/{username}")]
    public async Task<IActionResult> GetTaskByUsername(string username)
    {
        var task = await _tasksRepository.GetByUsername(username);
        if (task != null) return Ok(task);
        return NotFound("Product does not exist");
    }

}