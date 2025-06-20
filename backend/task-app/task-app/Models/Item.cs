using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace task_app.Models
{
    public class Item
    {
        
            [BsonId]
            public ObjectId Id { get; set; }

        public string Name { get; set; } = null!; 
           
        
    }
}


