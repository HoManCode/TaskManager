using TMS.Models;

namespace TMS.Repository;

public interface ITasksRepository
{
    public Task<Tasks?> GetById(int id);
    public Task<IEnumerable<Tasks?>> GetByUsername(string username);
}