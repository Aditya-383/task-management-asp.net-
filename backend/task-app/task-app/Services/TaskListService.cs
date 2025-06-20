using MongoDB.Driver;
using task_app.Models;
using task_app.DTO;
using System;
using System.Collections.Generic;
using MongoDB.Bson;
using System.Globalization;


namespace task_app.Services
{
    public class TaskListService
    {
        private readonly IMongoCollection<TaskList> _taskCollection;
        private readonly IMongoCollection<User> _usersCollection;

        public TaskListService(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("task-app-1");
            _taskCollection = database.GetCollection<TaskList>("Tasks");
            _usersCollection = database.GetCollection<User>("Users");
        }

        // Create Task
        public async Task<TaskList> CreateTaskAsync(TaskList task)
        {
            try
            {
                await _taskCollection.InsertOneAsync(task);
                return task;
            }
            catch (Exception ex)
            {
                throw new Exception("Error creating task: " + ex.Message);
            }
        }

        // Get Task by ID
        public async Task<TaskList> GetTaskByIdAsync(string taskId)
        {
            try
            {
                var objectId = new ObjectId(taskId);
                var task = await _taskCollection.Find(x => x.Id == taskId).FirstOrDefaultAsync();
                if (task == null)
                {
                    throw new Exception("Task not found");
                }
                return task;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching task: " + ex.Message);
            }
        }

        // Get All Tasks
        public async Task<List<TaskList>> GetAllTasksAsync()
        {
            try
            {
                return await _taskCollection.Find(x => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching tasks: " + ex.Message);
            }
        }

        public async Task<List<TaskList>> GetTasksByUserIdAsync(string userId)
        {
            try
            {
                Console.WriteLine($"userId :{userId}");
                userId = userId?.Trim();
                Console.WriteLine($"projectId :{userId}");
                var result = await _taskCollection.Find(task => task.AssignedTo.Contains(userId)).ToListAsync();
                Console.WriteLine($"Found {result.Count} tasks for projectId: {userId}");
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching tasks by project ID: " + ex.Message);
            }
        }

        public async Task<List<TaskList>> GetTasksByTitleAsync(string title, string projectId)
        {
            try
            {
                Console.WriteLine($"userId :{title}");


                var result = await _taskCollection.Find(x => (x.TaskName == title && x.ProjectId == projectId)).ToListAsync();

                //    Console.WriteLine($"Found {result.Count} tasks for projectId: {userId}");
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching tasks by project ID: " + ex.Message);
            }
        }

        public async Task<List<TaskList>> GetTasksByDateAsync(string dateString, string value, string projectId)
        {
            try
            {


                // Parse the input string to DateTime
                DateTime date = DateTime.ParseExact(dateString, "yyyy-MM-dd", CultureInfo.InvariantCulture);


                DateTime day = date.Date;
                Console.WriteLine($"Start of day: {day}");


                if (value == "start-Date")
                {
                    var result = await _taskCollection.Find(x => x.ProjectId == projectId && x.StartDate == day).ToListAsync();
                    return result;
                }
                else
                {
                    var result = await _taskCollection.Find(x => x.ProjectId == projectId && x.EndDate == day).ToListAsync();
                    return result;
                }



            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching tasks by date: " + ex.Message);
            }
        }


        public async Task<List<TaskList>> GetTasksByStatusAsync(string value, string projectId)
        {
            try
            {
                Console.WriteLine($"userId :{value}");


                var result = await _taskCollection.Find(x => (x.TaskStatus == value && x.ProjectId == projectId)).ToListAsync();

                //    Console.WriteLine($"Found {result.Count} tasks for projectId: {userId}");
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching tasks by project ID: " + ex.Message);
            }
        }
        public async Task<List<TaskWithUserDetails>> GetTasksByProjectIdAsync(string projectId)
        {
            try
            {
                projectId = projectId?.Trim();
                Console.WriteLine($"task-projectId :{projectId}");
                var tasks = await _taskCollection.Find(x => (x.ProjectId == projectId)).ToListAsync();
                var result = new List<TaskWithUserDetails>();

                foreach (var project in tasks)
                {
                    
                    var userIds = project.AssignedTo;

                    var userFilter = Builders<User>.Filter.In(u => u.Id, userIds);
                    var assignedUsers = await _usersCollection.Find(userFilter).ToListAsync();

                    result.Add(new TaskWithUserDetails
                    {
                        Id = project.Id,
                        TaskName = project.TaskName,
                        TaskDescription = project.TaskDescription,
                        TaskStatus = project.TaskStatus,
                        AssignedTo = project.AssignedTo,
                        StartDate = project.StartDate,
                        EndDate = project.EndDate,
                        IsDelete = project.IsDelete,
                        CreatedBy = project.CreatedBy,
                        AssignedUsers = assignedUsers
                    });
                }


                Console.WriteLine(result);

              

                return result;


            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching tasks by task ID: " + ex.Message);
            }
        }

     
        public async Task<TaskList> UpdateTaskStatusByUserAsync(string taskId, string status)
        {
            try
            {
                var objectId = new ObjectId(taskId);
                var updatedTask = await _taskCollection.FindOneAndUpdateAsync(
                    x => x.Id == taskId,
                    Builders<TaskList>.Update.Set(x => x.TaskStatus, status),
                    new FindOneAndUpdateOptions<TaskList> { ReturnDocument = ReturnDocument.After }
                );

                if (updatedTask == null)
                {
                    throw new Exception("Task not found");
                }

                return updatedTask;
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating task: " + ex.Message);
            }
        }

       
        public async Task<TaskList> UpdateTaskByAdminAsync(string taskId, TaskList taskData)
        {
            try
            {
                var objectId = new ObjectId(taskId);
                var updatedTask = await _taskCollection.FindOneAndUpdateAsync(
                    x => x.Id == taskId,
                    Builders<TaskList>.Update.Set(x => x.TaskName, taskData.TaskName)
                                        .Set(x => x.TaskDescription, taskData.TaskDescription)
                                        .Set(x => x.TaskStatus, taskData.TaskStatus)
                                        .Set(x => x.AssignedTo, taskData.AssignedTo)
                                        .Set(x => x.StartDate, taskData.StartDate)
                                        .Set(x => x.EndDate, taskData.EndDate),
                    new FindOneAndUpdateOptions<TaskList> { ReturnDocument = ReturnDocument.After }
                );

                if (updatedTask == null)
                {
                    throw new Exception("Task not found");
                }

                return updatedTask;
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating task: " + ex.Message);
            }
        }

      
        public async Task<bool> DeleteTaskByIdAsync(string taskId)
        {
            try
            {
                var objectId = new ObjectId(taskId);
                var result = await _taskCollection.DeleteOneAsync(x => x.Id == taskId);
                return result.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error deleting task: " + ex.Message);
            }
        }

        //public async Task<List<TaskList>> GetTasksByProjectIdAsync(string projectId)
        //{
        //    try
        //    {
        //        var filter = Builders<TaskList>.Filter.Eq(t => t.ProjectId, projectId);
        //        return await _taskCollection.Find(filter).ToListAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error retrieving tasks by project ID: " + ex.Message);
        //    }
        //}

    }

}





