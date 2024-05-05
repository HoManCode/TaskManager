using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace TMS.Controllers;

[Route("api/auth")]
[ApiController]
[EnableCors("AllowOrigin")]
public class AuthController : ControllerBase
{
   
}