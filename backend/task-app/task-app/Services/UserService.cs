using MongoDB.Bson;
using MongoDB.Driver;
using task_app.Models;
using task_app.DTO;

namespace task_app.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserService(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("task-app-1"); 
            _userCollection = database.GetCollection<User>("Users");
        }

        
        public async Task<User> CreateUserAsync(User user)
        {
            try
            {
                var existingUser = await _userCollection.Find(u => u.Email == user.Email).FirstOrDefaultAsync();
                if (existingUser != null)
                {
                    throw new Exception("User already exists with the provided email.");
                }

                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                await _userCollection.InsertOneAsync(user);
                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Error creating user: " + ex.Message);
            }
        }

        
        public async Task<User> GetUserByEmailAsync(string email)
        {
            try
            {
                var user = await _userCollection.Find(u => u.Email == email).FirstOrDefaultAsync();
                if (user == null)
                {
                    throw new Exception("User not found with the provided email.");
                }

                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving user: " + ex.Message);
            }
        }

        
        public async Task<User> GetUserByIdAsync(string userId)
        {
            try
            {
                var objectId = new ObjectId(userId);
                var user = await _userCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
                if (user == null)
                {
                    throw new Exception("User not found.");
                }

                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving user: " + ex.Message);
            }
        }

        
        public async Task<List<User>> GetAllUsersAsync()
        {
            try
            {
                return await _userCollection.Find(u => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving users: " + ex.Message);
            }
        }

      
        public async Task<User> UpdateUserAsync(string userId, UpdateUserDto updatedData)
        {
            try
            {

                var user = await _userCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
                if (user == null)
                {
                    throw new Exception("User not found.");
                }

                user.Name = updatedData.Name ?? user.Name;
                user.IsActive = updatedData.IsActive;


                await _userCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating user: " + ex.Message);
            }
        }

        
        public async Task<bool> DeleteUserAsync(string userId)
        {
            try
            {
                var objectId = new ObjectId(userId);
                var result = await _userCollection.DeleteOneAsync(u => u.Id == userId);
                return result.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error deleting user: " + ex.Message);
            }
        }

        public async Task<List<User>> GetUserByNameAsync(string name)
        {
            try
            {
                var user = await _userCollection.Find(u => u.Name == name).FirstOrDefaultAsync();

                if (user == null)
                {
                    throw new Exception("Student Not Found! Enter valid name");
                }

                return new List<User> { user };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching user: {ex.Message}");
            }
        }

        public async Task<List<User>> GetUserByStatusAsync(bool active)
        {
            try
            {
                var users = await _userCollection.Find(u => u.IsActive == active).ToListAsync();
                if (users == null || users.Count == 0)
                {
                    throw new Exception("No users found with the given status.");
                }



                return users;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching user: {ex.Message}");
            }
        }




        public async Task<User> UpdateUserByIdAsync(string userId, User updatedData)
        {
            try
            {
                var objectId = new ObjectId(userId);
                var user = await _userCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();

                if (user == null)
                {
                    throw new Exception("User not found.");
                }

                user.Name = !string.IsNullOrEmpty(updatedData.Name) ? updatedData.Name : user.Name;
                user.Email = !string.IsNullOrEmpty(updatedData.Email) ? updatedData.Email : user.Email;
                user.Role = !string.IsNullOrEmpty(updatedData.Role) ? updatedData.Role : user.Role;
                user.IsActive = updatedData.IsActive;
                user.UpdatedAt = DateTime.UtcNow;

                await _userCollection.ReplaceOneAsync(u => u.Id == userId, user);
                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating user: " + ex.Message);
            }
        }

        

    }
}
