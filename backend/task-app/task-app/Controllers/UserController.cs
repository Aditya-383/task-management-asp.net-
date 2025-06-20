

using Microsoft.AspNetCore.Mvc;
using task_app.Models;
using task_app.Services;
using task_app.DTO;
using System.Threading.Tasks;

namespace task_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtService _jwtService;


        public UserController(UserService userService, JwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync(); 
            return Ok(users);
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUserRoles()
        {
            var users = await _userService.GetAllUsersAsync();
            var nonAdmin = users.Where(u => u.Role == "User").ToList();
            return Ok(nonAdmin);
        }


        [HttpGet("id/{userId}")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            return user != null ? Ok(user) : NotFound("User not found");
        }

        [HttpGet("email")]
        public async Task<IActionResult> GetUserByEmail([FromQuery] string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            return user != null ? Ok(user) : NotFound("User not found");
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetUserByName(string name)
        {
            var user = await _userService.GetUserByNameAsync(name);
            return user != null ? Ok(new  {message= "successfully", user}) : NotFound("User not found");
        }
        
        [HttpGet("status/{active}")]
        public async Task<IActionResult> GetUserByStatus(bool active)
        {
            // var actives = bool.Parse(active);
            var user = await _userService.GetUserByStatusAsync(active);
            return user != null ? Ok(new { message = "successfully", user }) : NotFound("User not found");
        }
        [HttpGet("token")]
        public async Task<IActionResult> GetUserByToken()
        {
            var jwt = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(jwt))
                return BadRequest("Token not provided");

            var user = _jwtService.GetUserIdFromToken(jwt);
            if (user == null)
                return NotFound("Invalid token");
           

            return user != null ? Ok(user) : NotFound("User not found");
        }


        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            var result = await _userService.DeleteUserAsync(userId);
            return result ? Ok("User deleted successfully") : NotFound("User not found");
        }

        //[HttpPut("{userId}")]
        //public async Task<IActionResult> UpdateUserById(string userId, [FromBody] User updatedUser)
        //{
        //    var user = await _userService.UpdateUserByIdAsync(userId, updatedUser);
        //    return Ok(new { message = "User updated successfully", user });
        //}

        [HttpPatch("{userId}")]
public async Task<IActionResult> UpdateUserById(string userId, [FromBody] UpdateUserDto updatedData)
{
    try
    {
        var updatedUser = await _userService.UpdateUserAsync(userId, updatedData);
        return Ok(new { message = "User updated successfully", user = updatedUser });
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error updating user: " + ex.Message);
        return StatusCode(500, new { message = "Error updating user" });
    }
}


    }
}
