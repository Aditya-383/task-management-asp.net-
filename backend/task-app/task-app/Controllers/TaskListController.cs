
using Microsoft.AspNetCore.Mvc;
using task_app.Models;
using task_app.Services;
using System.Threading.Tasks;


namespace task_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskListController : ControllerBase
    {
        private readonly TaskListService _taskService;

        public TaskListController(TaskListService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskList task)
        {
            try
            {
                Console.WriteLine("hello");
                var created = await _taskService.CreateTaskAsync(task);
                return Ok(new { message = "Task created successfully", task = created });
               
            }
            catch (Exception ex)
            {
              
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("{taskId}")]
        public async Task<IActionResult> GetTaskById(string taskId)
        {
            try
            {
                var task = await _taskService.GetTaskByIdAsync(taskId);
                if (task == null) return NotFound(new { message = "Task not found" });

                return Ok(new { message = "Task retrieved successfully", task });
            }
            catch
            {
                return StatusCode(500, new { message = "Task retrieve failed" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            try
            {
                var tasks = await _taskService.GetAllTasksAsync();
                return Ok(new { message = "All tasks retrieved successfully", tasks });
            }
            catch
            {
                return StatusCode(500, new { message = "Failed" });
            }
        }

        [HttpGet("User/{userId}")]
        public async Task<IActionResult> GetTasksByUserId(string userId)
        {
            try
            {
                var tasks = await _taskService.GetTasksByUserIdAsync(userId);
                if (tasks.Count == 0)
                    return NotFound(new { message = "No tasks found for this user--" });

                return Ok(new { message = "Tasks retrieved successfully", tasks });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Task retrieval failed", error = ex.Message });
            }
        }

        [HttpGet("Title/{title}")]
        public async Task<IActionResult> GetTasksByTitle(string title, [FromQuery] string projectId)
        {
            try
            {
                var tasks = await _taskService.GetTasksByTitleAsync(title, projectId);
                if (tasks.Count == 0)
                    return NotFound(new { message = "No tasks found for this user--" });

                return Ok(new { message = "Tasks retrieved successfully", tasks });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Task retrieval failed", error = ex.Message });
            }
        }

        [HttpGet("by-date/{date}")]
        public async Task<IActionResult> GetTasksByDate(string date, [FromQuery] string value, [FromQuery] string projectId)
        {
            if (string.IsNullOrEmpty(date) || string.IsNullOrEmpty(projectId))
            {
                return BadRequest("Date and ProjectId are required.");
            }
            Console.WriteLine($"date :{date}");
            Console.WriteLine($"projectId :{projectId}");

            try
            {
                var tasks = await _taskService.GetTasksByDateAsync(date, value, projectId);
                if (tasks.Count == 0)
                    return NotFound(new { message = "No tasks found for this date" });
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("Status/{value}")]

        public async Task<IActionResult> GetTasksByStatus([FromRoute] string value, [FromQuery] string projectId)
        {
            Console.WriteLine($"value :{value}");
            try
            {
                var tasks = await _taskService.GetTasksByStatusAsync(value, projectId);
                if (tasks.Count == 0)
                    return StatusCode(500, new { message = "No task" });

                return Ok(new { message = "Tasks retrieved successfully", tasks });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Task retrieval failed", error = ex.Message });
            }
        }


        [HttpPatch("user/{taskId}")]
        public async Task<IActionResult> TaskUpdateByUser(string taskId, [FromBody] string status)
        {
            try
            {
                Console.WriteLine($"Data: taskId = {taskId}, status = {status}");
                if (string.IsNullOrEmpty(status))
                    return BadRequest(new { message = "Status cannot be empty" });

                var updatedTask = await _taskService.UpdateTaskStatusByUserAsync(taskId, status);
                return Ok(new { message = "Task status updated successfully", task = updatedTask });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error updating task status: " + ex.Message);
                return StatusCode(500, new { message = "Failed to update task status", error = ex.Message });
            }
        }

        [HttpPatch("admin/{taskId}")]
        public async Task<IActionResult> TaskUpdateByAdmin(string taskId, [FromBody] TaskList taskData)
        {
            try
            {
                Console.WriteLine($"Data: taskId = {taskId}, taskData = {taskData}");
                var updatedTask = await _taskService.UpdateTaskByAdminAsync(taskId, taskData);
                return Ok(new { message = "Task updated successfully", task = updatedTask });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to update task", error = ex.Message });
            }
        }

        [HttpGet("Project/{projectId}")]
        public async Task<IActionResult> GetTasksByProjectId(string projectId)
        {
            try
            {
                Console.WriteLine($"projectId-task :{projectId}");
                var tasks = await _taskService.GetTasksByProjectIdAsync(projectId);
                if (tasks.Count == 0)
                    return NotFound(new { message = "No tasks found for this project--" });

                return Ok(new { message = "Tasks retrieved successfully", tasks });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Task retrieval failed", error = ex.Message });
            }
        }

        [HttpDelete("{taskId}")]
        public async Task<IActionResult> DeleteTask(string taskId)
        {
            try
            {
                var deleted = await _taskService.DeleteTaskByIdAsync(taskId);
                if (!deleted)
                    return NotFound(new { message = "Task not found!" });

                return Ok(new { message = "Task deleted successfully" });
            }
            catch
            {
                return StatusCode(500, new { message = "Task not deleted" });
            }
        }
    }
}
