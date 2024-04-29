using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace TMS.Models;

public class User
{
    [Key]
    public long Id { get; set; }
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string email { get; set; }
    public string username { get; set; }
    public string password { get; set; }
    public HashSet<Authorities> authorities = [];
}