using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/note")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private NoteService _noteService;

        public NotesController() {
            _noteService = new NoteService();
        }

        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var res = _noteService.FindAll();
            return Ok(res);
        }

        // GET api/values/5
        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            var res = _noteService.FindById(id);
            if(res == null)
            {
                return NotFound();
            }
            return Ok(res);
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NoteParams input, CancellationToken cancellationToken)
        {
            var res = await _noteService.CreateAsync(input.Title, input.Text, cancellationToken);

            return Ok(res);
        }

        // PUT api/values/5
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] NoteParams value, CancellationToken cancellationToken)
        {
            var res = _noteService.FindById(id);
            if (res == null)
            {
                return NotFound();
            }

            res = await _noteService.UpdateAsync(id, value.Title, value.Text, cancellationToken);

            return Ok(res);
        }

        // DELETE api/values/5
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            Note res = _noteService.FindById(id);
            if (res == null)
            {
                return NotFound();
            }

            int affectedRow = await _noteService.DeleteAsync(id, cancellationToken);

            return NoContent();
        }
    }
}
