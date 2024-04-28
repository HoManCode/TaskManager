using TMS.Enum;

namespace TMS.Models;

public class Authorities
{
    private long Id { get; set; }
    private User user { get; set; }
    private Authority authority { get; set; }
}