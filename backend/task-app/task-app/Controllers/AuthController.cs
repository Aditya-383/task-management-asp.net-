


using Microsoft.AspNetCore.Mvc;
using task_app.Models;
using task_app.Services;
using System.Threading.Tasks;

namespace task_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _authService;
        private readonly JwtService _jwtProvider;

        public AuthController(UserService authService , JwtService jwtProvider)
        {
            _authService = authService;
            _jwtProvider = jwtProvider;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            try
            {
                var registeredUser = await _authService.CreateUserAsync(user);
                var token = _jwtProvider.GenerateToken(registeredUser.Id.ToString());
                return Ok(new { message = "register success", token });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest login)
        {
            try
            {
                var user = await _authService.GetUserByEmailAsync(login.Email);

                if(user.Role != login.Role)
                {
                    return StatusCode(500, new { error = "Not valid User!" });
                }
                var token = _jwtProvider.GenerateToken(user.Id.ToString());
                return Ok(new {  user, message = "login success", token });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
