using Microsoft.AspNetCore.Mvc;
using TMS.Data;
using TMS.Models;
using TMS.Repository;

namespace TMS.Controllers;

[Route("api/TMS")]
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

}