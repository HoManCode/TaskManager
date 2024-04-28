using System.Collections.ObjectModel;

namespace TMS.Models;

public class User
{
    private long Id { get; set; }
    private string firstName { get; set; }
    private string lastName { get; set; }
    private string email { get; set; }
    private string username { get; set; }
    private string password { get; set; }
    private HashSet<Authorities> authorities = [];
}