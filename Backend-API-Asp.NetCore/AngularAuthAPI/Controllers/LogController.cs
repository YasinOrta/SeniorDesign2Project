using AngularAuthAPI.Context;
using AngularAuthAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularAuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly AppDbContext _authContext;

        public LogController(AppDbContext authContext)
        {
            _authContext = authContext;
        }

        [Authorize]
        [HttpPost("CreateLog")]
        public async Task<IActionResult> CreateLogHttp(Log logObj)
        {
            if (logObj == null)
            {
                return BadRequest();
            }

            await _authContext.Logs.AddAsync(logObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "Log saved successfully!"
            }
            );
        }

        [Authorize]
        [HttpGet("Logs")]
        public async Task<ActionResult<IEnumerable<Log>>> GetLogsHttp()
        {
            if (_authContext.Logs == null)
            {
                return NotFound();
            }

            return await _authContext.Logs.ToListAsync();
        }

        [Authorize]
        [HttpDelete("DeleteLog")]
        public async Task<IActionResult> DeleteLogByIdHttp(int id)
        {
            if (_authContext.Logs == null) return NotFound();

            var log = await _authContext.Logs.FindAsync(id);

            if (log == null) return NotFound();

            _authContext.Logs.Remove(log);

            await _authContext.SaveChangesAsync();

            return Ok();
        }
    }
}
