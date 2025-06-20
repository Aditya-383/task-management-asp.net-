using Microsoft.Extensions.Options;
using MongoDB.Driver;
using task_app.Models;
using task_app.Controllers;


namespace task_app.Services
{
    public class ItemService
    {

        private readonly IMongoCollection<Item> _itemsCollection;

        public ItemService(IOptions<MongoDBSettings> mongoSettings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(mongoSettings.Value.DatabaseName);
            _itemsCollection = database.GetCollection<Item>(mongoSettings.Value.CollectionName);
        }

        public async Task<List<Item>> GetAsync() =>
            await _itemsCollection.Find(_ => true).ToListAsync();

        public async Task CreateAsync(Item newItem) =>
            await _itemsCollection.InsertOneAsync(newItem);
    }
}





