using MongoDB.Bson;
using MongoDB.Driver;
using task_app.Models;
using System.Globalization;
using task_app.DTO;


namespace task_app.Services
{

    public class ProjectService
    {
        private readonly IMongoCollection<Project> _projectsCollection;
        private readonly IMongoCollection<User> _usersCollection;

        public ProjectService(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("task-app-1");
            _projectsCollection = database.GetCollection<Project>("Projects");
            _usersCollection = database.GetCollection<User>("Users");
        }

        public async Task<Project> CreateProjectAsync(Project project)
        {
            try
            {
                await _projectsCollection.InsertOneAsync(project);
                return project;
            }
            catch (Exception ex)
            {
                throw new Exception("Error creating project: " + ex.Message);
            }
        }

        public async Task<List<Project>> GetProjectByTitleAsync(string projectTitle)
        {
            try
            {
                var projects = await _projectsCollection.Find(x => x.ProjectTitle.ToLower() == projectTitle.ToLower()).ToListAsync();

                if (projects == null || projects.Count == 0)
                {
                    throw new Exception("No projects found with the given title.");
                }

                return projects;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching projects: {ex.Message}");
            }
        }

        //      public async Task<(List<Project> Items, string NextCursor)> GetAllProjectByPaginationAsync( string cursor)
        // {
        //     var filter = Builders<Project>.Filter.Empty;
        //     int limit = 30;
        //     if (!string.IsNullOrEmpty(cursor) )
        //     {
        //         filter = Builders<Project>.Filter.Gt(x => x.Id, cursor);
        //     }

        //     var sort = Builders<Project>.Sort.Ascending(x => x.Id);

        //     var project = await _projectsCollection.Find(filter).Sort(sort) .ToListAsync();

        //     string nextCursor = project.Count > 0 ? project[project.Count-1].Id.ToString() : null;

        //     return (project, nextCursor);
        // }
        // public async Task<List<Project>> GetAllProjectsAsync()
        // {
        //     try
        //     {
        //         Console.WriteLine("servicec projrct");
        //         return await _projectsCollection.Find(x => true).ToListAsync();
        //     }
        //     catch (Exception ex)
        //     {
        //         throw new Exception("Error fetching projects: " + ex.Message);
        //     }
        // }

public async Task<List<ProjectWithUserDetails>> GetAllProjectByPaginationAsync(string cursor)
{
     var projects = await _projectsCollection.Find(x => true).ToListAsync();
     var result = new List<ProjectWithUserDetails>();

                foreach (var project in projects)
                {
                    
                    var userIds = project.AssignedUser;

                    var userFilter = Builders<User>.Filter.In(u => u.Id, userIds);
                    var assignedUsers = await _usersCollection.Find(userFilter).ToListAsync();

                    result.Add(new ProjectWithUserDetails
                    {
                        Id = project.Id,
                        ProjectTitle = project.ProjectTitle,
                        Description = project.Description,
                        StartDate = project.StartDate,
                        AssignedUser = project.AssignedUser,
                        EndDate = project.EndDate,
                        IsDelete = project.IsDelete,
                        CreatedBy = project.CreatedBy,
                        AssignedUsers = assignedUsers
                    });
                }
                Console.WriteLine(result);

    

    return result;
}

        // public async Task<List<ProjectWithUserDetails>> GetAllProjectsAsync()
        // {
        //     try
        //     {
        //         var projects = await _projectsCollection.Find(x => true).ToListAsync();

        //         var result = new List<ProjectWithUserDetails>();

        //         foreach (var project in projects)
        //         {
        //             // Convert string IDs to ObjectId
        //             var userIds = project.AssignedUser;

        //             var userFilter = Builders<User>.Filter.In(u => u.Id, userIds);
        //             var assignedUsers = await _usersCollection.Find(userFilter).ToListAsync();

        //             result.Add(new ProjectWithUserDetails
        //             {
        //                 Id = project.Id,
        //                 ProjectTitle = project.ProjectTitle,
        //                 Description = project.Description,
        //                 StartDate = project.StartDate,
        //                 AssignedUser = project.AssignedUser,
        //                 EndDate = project.EndDate,
        //                 IsDelete = project.IsDelete,
        //                 CreatedBy = project.CreatedBy,
        //                 AssignedUserDetails = assignedUsers
        //             });
        //         }
        //         Console.WriteLine(result);

        //         return result;
        //     }
        //     catch (Exception ex)
        //     {
        //         throw new Exception("Error fetching projects with user details: " + ex.Message);
        //     }
        // }


        public async Task<List<ProjectWithUserDetails>> GetProjectByIdAsync(string projectId)
        {
            try
            {
                Console.WriteLine("servicec projrct");
                var objectId = new ObjectId(projectId);
                var project = await _projectsCollection.Find(x => x.Id == projectId).FirstOrDefaultAsync();
                if (project == null)
                {
                    throw new Exception("Project not found");
                }
                 var result = new List<ProjectWithUserDetails>();

             
                    var userIds = project.AssignedUser;

                    var userFilter = Builders<User>.Filter.In(u => u.Id, userIds);
                    var assignedUsers = await _usersCollection.Find(userFilter).ToListAsync();

                    result.Add(new ProjectWithUserDetails
                    {
                         Id = project.Id,
                         ProjectTitle = project.ProjectTitle,
                         Description = project.Description,
                         StartDate = project.StartDate,
                         AssignedUser = project.AssignedUser,
                        EndDate = project.EndDate,
                        IsDelete = project.IsDelete,
                        CreatedBy = project.CreatedBy,
                        AssignedUsers = assignedUsers
       });     
                
                Console.WriteLine(result);

       
              return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching project: " + ex.Message);
            }
        }

        public async Task<bool> DeleteProjectByIdAsync(string projectId)
        {
            try
            {
                
                var result = await _projectsCollection.DeleteOneAsync(x => x.Id == projectId);
                
                return result.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error deleting project: " + ex.Message);
            }
        }

        public async Task<Project> projectUpdateByAdminAsync(string projectId, Project updatedProjectData)
        {
            try
            {
                var objectId = new ObjectId(projectId);
                var updatedProject = await _projectsCollection.FindOneAndUpdateAsync(
                        x => x.Id == projectId,
                        Builders<Project>.Update.Set(x => x.ProjectTitle, updatedProjectData.ProjectTitle)
                                               .Set(x => x.Description, updatedProjectData.Description),
                        new FindOneAndUpdateOptions<Project> { ReturnDocument = ReturnDocument.After }
                    );

                if (updatedProject == null)
                {
                    throw new Exception("Project update failed");
                }

                return updatedProject;
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating project: " + ex.Message);
            }
        }

        public async Task<List<Project>> GetProjectByDateAsync(string dateString, string value)
        {
            try
            {


                DateTime date = DateTime.ParseExact(dateString, "yyyy-MM-dd", CultureInfo.InvariantCulture);


                DateTime day = date.Date;
                Console.WriteLine($"Start of day: {day}");

      FilterDefinition<Project> filter;

        if (value == "start-date")
        {
            filter = Builders<Project>.Filter.And(Builders<Project>.Filter.Eq(t => t.StartDate, day));
        }
        else if (value == "end-date")
        {
            filter = Builders<Project>.Filter.And(Builders<Project>.Filter.Eq(t => t.EndDate, day));
        }
        else
        {
            throw new ArgumentException("Invalid value. Expected 'start-date' or 'end-date'.");
        }

        
        var result = await _projectsCollection.Find(filter).ToListAsync();

        return result;


            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching tasks by date: " + ex.Message);
            }
        }
    }
}






