using TMS.Models;
using Microsoft.EntityFrameworkCore;
namespace TMS.Data;

public class TMSContext :DbContext
{
    public TMSContext(DbContextOptions<TMSContext> options) : base (options) { }

    public DbSet<Authorities> Authorities { get; set; }
    public DbSet<Tasks> Tasks { get; set; }
    public DbSet<User> Users { get; set; }
}