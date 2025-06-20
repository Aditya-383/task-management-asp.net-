using System.Collections.Generic;
using task_app.Models;

namespace task_app.DTO
{
    public class TaskWithUserDetails : TaskList
    {
        public TaskList Project { get; set; } = null!;
    public List<User> AssignedUsers { get; set; } = new();
    }
}
 