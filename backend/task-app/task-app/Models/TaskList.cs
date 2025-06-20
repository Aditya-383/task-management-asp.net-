using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace task_app.Models
{
    public class TaskList
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("taskName")]
        public string TaskName { get; set; } = null!;

        [BsonElement("taskDescription")]
        public string TaskDescription { get; set; } = null!;

        [BsonElement("taskStatus")]
        public string TaskStatus { get; set; } = "In Progress";

        [BsonElement("assignedTo")]
               public List<string> AssignedTo { get; set; } = new();

        [BsonElement("startDate")]
        public DateTime StartDate { get; set; } = DateTime.UtcNow;

        [BsonElement("endDate")]
        public DateTime EndDate { get; set; } = DateTime.UtcNow;

        [BsonElement("isDelete")]
        public bool IsDelete { get; set; } = false;

        [BsonElement("projectId")]
               public string? ProjectId { get; set; }

        [BsonElement("createdBy")]
   
        public string? CreatedBy { get; set; }
    }
}
