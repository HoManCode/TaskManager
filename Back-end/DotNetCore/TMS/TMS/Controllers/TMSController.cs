using Microsoft.AspNetCore.Mvc;
using TMS.Data;
using TMS.Models;

namespace TMS.Controllers;

[Route("api/TMS")]
[ApiController]
public class TMSController : ControllerBase
{
    private readonly TMSContext _context;

    public TMSController(TMSContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTaskById(int id)
    {
        if (id <= 0 )
        {
            return BadRequest("Invalid id");
        }
        var task = await _context.Tasks.FindAsync(id);
        if (task != null) return Ok(task);
        return NotFound("Product does not exist");
    }

}