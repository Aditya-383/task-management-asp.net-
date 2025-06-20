using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;

namespace task_app.Models
{
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } 

        [BsonElement("projectTitle")]
       public string ProjectTitle { get; set; } = null!;
        [BsonElement("projectDescription")]

        [JsonPropertyName("description")]
        public string? Description { get; set; } = null!;

        [BsonElement("startDate")]
        public DateTime StartDate { get; set; } = DateTime.UtcNow;

        [BsonElement("assignedUser")]
        public List<string> AssignedUser { get; set; } = new();

        [BsonElement("endDate")]
        public DateTime EndDate { get; set; } = DateTime.UtcNow;

        [BsonElement("isDelete")]
        public bool IsDelete { get; set; } = false;

        [BsonElement("createdBy")]
        public string? CreatedBy { get; set; }
    }
}
