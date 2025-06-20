using Microsoft.AspNetCore.Mvc;
using task_app.Models;
using task_app.Services;

namespace task_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService _projectService;
        private readonly JwtService _jwtService;
        private readonly UserService _UserService;

        public ProjectController(ProjectService projectService, JwtService jwtService,UserService UserService)
        {
            _projectService = projectService;
            _jwtService = jwtService;
            _UserService = UserService;

        }


      [HttpPost]
public async Task<IActionResult> CreateProject([FromBody] Project project)
{
    try
    {
       
        var token = HttpContext.Request.Headers["Authorization"].ToString();

        if (string.IsNullOrWhiteSpace(token))
        {
            return Unauthorized(new { message = "Authorization header is missing" });
        }

        
        token = token.Replace("Bearer ", "", StringComparison.OrdinalIgnoreCase);

        var userId = _jwtService.GetUserIdFromToken(token);
        
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized(new { message = "Invalid or expired token" });
        }

          var user = await _UserService.GetUserByIdAsync(userId);
          Console.WriteLine("userId: " + user.Role);
          if(user.Role != "Admin")
          {
            return Unauthorized(new { message = "You are not authorized to create a project" });
          }
                
          Console.WriteLine("userId: " + userId);
          
                project.CreatedBy = user.Name;

       
        Console.WriteLine("Creating project for userId: " + userId);
        Console.WriteLine("Project data: " + System.Text.Json.JsonSerializer.Serialize(project));

        var created = await _projectService.CreateProjectAsync(project);

        return CreatedAtAction(nameof(GetProjectById), new { id = created.Id }, created);
    }
    catch (Exception ex)
    {
        Console.WriteLine("Exception: " + ex.Message);
        return StatusCode(500, new { message = "An error occurred while creating the project", details = ex.Message });
    }
}



        [HttpGet("title/{projectTitle}")]
        public async Task<IActionResult> GetProjectsByTitle(string projectTitle)
        {
            try
            {
                var projects = await _projectService.GetProjectByTitleAsync(projectTitle);
                return Ok(new { message = "Projects fetched successfully", projects });
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpGet("pagi")]
    public async Task<IActionResult> GetAllProjects([FromQuery] string cursor = null)
    {
        var project = await _projectService.GetAllProjectByPaginationAsync( cursor);

        return Ok(new
        {
            project
        });
    }

        // [HttpGet]
        // public async Task<IActionResult> GetAllProjects()
        // {
        //     try
        //     {
        //         Console.WriteLine("hello");
        //         var projects = await _projectService.GetAllProjectsAsync();
        //         Console.WriteLine(projects);
        //         return Ok(new { message = "all project", project = projects });
        //     }
        //     catch (Exception ex)
        //     {
        //         Console.WriteLine(ex.Message);
        //         return StatusCode(500, new { message = ex.Message });
        //     }
        // }

        
        [HttpGet("{projectId}")]
         public async Task<IActionResult> GetProjectById(string projectId)
        {
            try
            {
                Console.WriteLine("hello"); 
                Console.WriteLine(projectId);
                var project = await _projectService.GetProjectByIdAsync(projectId);
                return Ok(new { message = "project by id", project });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectById(string id)
        {
            try
            {
                var project = await _projectService.DeleteProjectByIdAsync(id);
                return Ok(new { message = "delete project by id", project });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


        [HttpPatch("projectUpdateByAdmin/{id}")]
        public async Task<IActionResult> ProjectUpdateByAdmin(string id, [FromBody] Project update)
        {
            try
            {
                var updated = await _projectService.projectUpdateByAdminAsync(id, update);
                return Ok(new { message = "project status updated successfully", task = updated });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to update task status", error = ex.Message });
            }
        }

        [HttpGet("by-date/{date}")]
        public async Task<IActionResult> GetProjectByDate(string date, [FromQuery] string value)
        {
            if (string.IsNullOrEmpty(date) )
            {
                return BadRequest("Date and ProjectId are required.");
            }
            Console.WriteLine($"date :{date}");
           

            try
            {
                var tasks = await _projectService.GetProjectByDateAsync(date, value);
                if (tasks.Count == 0)
                    return NotFound(new { message = "No tasks found for this date" });
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}




