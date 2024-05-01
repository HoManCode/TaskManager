using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TMS.Enum;

namespace TMS.Models;

public class Authorities
{
    [Key]
    public int Id { get; set; }
    [Column("user_id")]
    public User user { get; set; }
    public Authority authority { get; set; }
}