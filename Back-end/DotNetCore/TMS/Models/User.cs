﻿using System;
using System.Collections.Generic;
using TMS.Enum;

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

}
