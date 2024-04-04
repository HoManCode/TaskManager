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
        this._context = context;
    }
    // GET
    [HttpGet]
    public string GetTasks()
    {
        return "GetAllTasks";
    }
}