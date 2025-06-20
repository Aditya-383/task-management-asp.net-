using Microsoft.AspNetCore.Mvc;
using task_app.Models;
using task_app.Services;

namespace task_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ItemService _itemService;

        
        public ItemsController(ItemService itemService)
        {
            _itemService = itemService;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<Item>>> GetItems()
        {
            var items = await _itemService.GetAsync();
            if (items == null || items.Count == 0)
            {
                return NotFound("No items found.");
            }
            return Ok(items);
        }

        
        [HttpPost]
        public async Task<ActionResult> CreateItem([FromBody] Item newItem)
        {
            if (newItem == null)
            {
                return BadRequest("Item data is required.");
            }

            await _itemService.CreateAsync(newItem);
            return CreatedAtAction(nameof(GetItems), new { id = newItem.Id }, newItem);
        }
    }
}
