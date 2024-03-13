using System;
using System.Collections.Generic;

namespace TMS.Models;

public partial class User
{
    public long Id { get; set; }

    public string? Email { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Password { get; set; }

    public string? Username { get; set; }

    public virtual ICollection<Authority> Authorities { get; set; } = new List<Authority>();

    public virtual ICollection<Authority1> Authority1s { get; set; } = new List<Authority1>();
}
