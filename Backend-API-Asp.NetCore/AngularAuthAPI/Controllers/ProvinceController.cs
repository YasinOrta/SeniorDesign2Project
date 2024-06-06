using AngularAuthAPI.Context;
using AngularAuthAPI.Models;
using AngularAuthAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularAuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvinceController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private readonly IDateTime _dateTime;
        private readonly ILogger<ProvinceController> _logger;

        public ProvinceController(AppDbContext appDbContext, IDateTime dateTime, ILogger<ProvinceController> logger)
        {
            _appDbContext = appDbContext;
            _dateTime = dateTime;
            _logger = logger;
        }

        [Authorize]
        [HttpPost("CreateProvince")]
        public async Task<IActionResult> CreateProvince(Province province) 
        {
            if(province == null) { return BadRequest(); }

            if (await CheckProvinceNameExistsAsync(province.Name)) {  return BadRequest(new {Message = "Province name exists!"}); }

            await _appDbContext.Provinces.AddAsync(province);

            await _appDbContext.SaveChangesAsync();

            _logger.LogInformation("Province created." + " Action time: " + _dateTime.Now);

            return Ok(new {Message = "Province created." + " Action time: " + _dateTime.Now });
        }

        [Authorize]
        [HttpGet("GetProvinces")]
        public async Task<ActionResult<Province>> GetProvinces()
        {
            try
            {
                if (_appDbContext.Provinces == null) { return BadRequest(); }

                _logger.LogInformation("ProvinceGet called." + " Time: " + _dateTime.Now);
                return Ok(await _appDbContext.Provinces.ToListAsync());
            }catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpDelete("DeleteProvince{id:int}")]
        public async Task<IActionResult> DeleteProvinceById(int id)
        {
            if (_appDbContext.Provinces == null) return NotFound();

            var province = await _appDbContext.Provinces.FindAsync(id);

            if (province == null) return NotFound();

            _appDbContext.Provinces.Remove(province);

            await _appDbContext.SaveChangesAsync();

            _logger.LogInformation("Province deleted." + " Time: " + _dateTime.Now);

            return Ok(new { Message = "Deletion is done." });
        }

        [Authorize]
        [HttpPut("UpdateProvince{id:int}")]
        public async Task<IActionResult> UpdateProvinceHttp(int id, [FromBody] Province provinceObj)
        {
            var province = await _appDbContext.Provinces.FindAsync(id);

            if (province == null) return NotFound();

            if (provinceObj == null) return BadRequest();

            if (!string.IsNullOrEmpty(provinceObj.Name) && provinceObj.Name != "string")
            {
                {
                    province.Name = provinceObj.Name;
                }
            }
            if (!string.IsNullOrEmpty(provinceObj.Vehicle_Registration_Plate) && provinceObj.Vehicle_Registration_Plate != "string") { province.Vehicle_Registration_Plate = provinceObj.Vehicle_Registration_Plate; }
            if (!string.IsNullOrEmpty(provinceObj.Region_Location) && provinceObj.Region_Location != "string") { province.Region_Location = provinceObj.Region_Location; }
            if (!string.IsNullOrEmpty(provinceObj.PopularFoods) && provinceObj.PopularFoods != "string") { province.PopularFoods = provinceObj.PopularFoods; }
            if (!string.IsNullOrEmpty(provinceObj.PopularProducedItems) && provinceObj.PopularProducedItems != "string") { province.PopularProducedItems = provinceObj.PopularProducedItems; }
            if (!string.IsNullOrEmpty(provinceObj.Population) && provinceObj.Population != "string") { province.Population = provinceObj.Population; }
            if (!string.IsNullOrEmpty(provinceObj.IsCapitalCity) && provinceObj.IsCapitalCity != "string") { province.IsCapitalCity = provinceObj.IsCapitalCity; }
            if (!string.IsNullOrEmpty(provinceObj.imgUrl) && provinceObj.imgUrl != "string") { province.imgUrl = provinceObj.imgUrl; }
            if (!string.IsNullOrEmpty(provinceObj.About) && provinceObj.About != "string") { province.About = provinceObj.About; }
            
            await _appDbContext.SaveChangesAsync();
            _logger.LogInformation("Action Time: " + _dateTime + ", Operation: Update Province.");
            return Ok(new { Message = "Updated province."});

        }

        [Authorize]
        [HttpGet("Search")]
        public async Task<IEnumerable<Province>> SearchProvince(string provinceName)
        {
            IQueryable<Province> query = _appDbContext.Provinces;

            if (!string.IsNullOrEmpty(provinceName))
            {
                query = query.Where(e => e.Name.Contains(provinceName));
            }

            return await query.ToListAsync();
        }

        private Task<bool> CheckProvinceNameExistsAsync(string provinceName) => 
            _appDbContext.Provinces.AnyAsync(x => x.Name == provinceName);
    }
}
