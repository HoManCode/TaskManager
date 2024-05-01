using TMS.Data;
using TMS.Models;

namespace TMS.Repository;

public class TasksRepository : ITasksRepository
{
    private readonly TMSContext _context;

    public TasksRepository(TMSContext context)
    {
        _context = context;
    }
    public async Task<Tasks?> GetById(int id)
    {
        return await _context.Tasks.FindAsync(id);
    }
}