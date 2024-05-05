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

    public async Task<IEnumerable<Tasks?>> GetByUsername(string username)
    {
        IQueryable<Tasks> tasks = _context.Tasks;

        tasks = tasks.Where(
            t => t.username.Equals(username));
        
        return tasks;
    }
}