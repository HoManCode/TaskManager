using System.ComponentModel.DataAnnotations;
using TMS.Enum;

namespace TMS.Models;

public class Authorities
{
    [Key]
    public long Id { get; set; }
    public User user { get; set; }
    public Authority authority { get; set; }
}