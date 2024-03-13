using System;
using System.Collections.Generic;

namespace TMS.Models;

public partial class Authority1
{
    public long Id { get; set; }

    public string? Authority { get; set; }

    public long? UserId { get; set; }

    public virtual User? User { get; set; }
}
