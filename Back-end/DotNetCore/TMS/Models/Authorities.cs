using System;
using System.Collections.Generic;

namespace TMS.Models;

public partial class Authorities
{
    public long Id { get; set; }

    public int? Authority { get; set; }

    public long? UserId { get; set; }

    public virtual User? User { get; set; }
}
