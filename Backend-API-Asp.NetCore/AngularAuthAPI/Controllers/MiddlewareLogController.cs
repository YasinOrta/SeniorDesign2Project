using AngularAuthAPI.Context;
using AngularAuthAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularAuthAPI.Controllers
{
    public class MiddlewareLogController : Controller
    {

        private readonly AppDbContext _authContext;

        public MiddlewareLogController(AppDbContext authContext)
        {
            _authContext = authContext;
        }

        [Authorize]
        [HttpPost("CreateMiddlewareLog")]
        public async Task<IActionResult> CreateMiddlewareLogHttp(MiddlewareLog middlewareLog)
        {
            if (middlewareLog == null)
            {
                return BadRequest();
            }

            await _authContext.MiddlewareLogs.AddAsync(middlewareLog);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "MiddlewareLog saved successfully!"
            }
            );
        }

        [Authorize]
        [HttpGet("MiddlewareLogs")]
        public async Task<ActionResult<IEnumerable<MiddlewareLog>>> GetMiddlewareLogsHttp()
        {
            if (_authContext.MiddlewareLogs == null)
            {
                return NotFound();
            }

            return await _authContext.MiddlewareLogs.ToListAsync();
        }

        [Authorize]
        [HttpDelete("DeleteMiddlewareLog")]
        public async Task<IActionResult> DeleteMiddlewareLogByIdHttp(int id)
        {
            if (_authContext.MiddlewareLogs == null) return NotFound();

            var middlewareLog = await _authContext.MiddlewareLogs.FindAsync(id);

            if (middlewareLog == null) return NotFound();

            _authContext.MiddlewareLogs.Remove(middlewareLog);

            await _authContext.SaveChangesAsync();

            return Ok();
        }
    public IActionResult Index()
        {
            return View();
        }
    }
}
