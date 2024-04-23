using System;
using System.Collections.Generic;

namespace TMS.Models;

public partial class Tasks
{
    public long Id { get; set; }

    public string? Description { get; set; }

    public DateTime? DueDate { get; set; }

    public int? Status { get; set; }

    public int StoryPoints { get; set; }

    public string? Username { get; set; }
}
