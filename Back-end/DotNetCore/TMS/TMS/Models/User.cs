using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace TMS.Models;

public class User
{
    [Key]
    public int Id { get; set; }
    [Column("first_name")]
    public string firstName { get; set; }
    [Column("last_name")]
    public string lastName { get; set; }
    public string email { get; set; }
    public string username { get; set; }
    public string password { get; set; }
    public HashSet<Authorities> authorities = [];
}