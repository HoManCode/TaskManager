using Microsoft.AspNetCore.Mvc;
using TMS.Data;

namespace TMS.Controllers;

[Produces("application/json")]
[Route("api/tasks")]
public class TaskController : Controller
{
    private readonly TmsContext _context;

    public TaskController(TmsContext context)
    {
        _context = context;
    }
    // GET
    [HttpGet("{id}")]
    public ActionResult<Task> GetTaskById(int id)
    {
        var task = _context.Find<Task>(id);
        if (task == null)
        {
            return NotFound(); // Return 404 Not Found if task not found
        }
        return Ok(task);
    }
    
    [HttpGet]
    public ActionResult<string> GetTask()
    {
        return Ok("task");
    }
}