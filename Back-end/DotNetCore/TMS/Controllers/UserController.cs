using Microsoft.AspNetCore.Mvc;
using TMS.Data;

namespace TMS.Controllers;

public class UserController : Controller
{
   
    private readonly TmsContext _context;

    public UserController(TmsContext context)
    {
        this._context = context;
    }
}