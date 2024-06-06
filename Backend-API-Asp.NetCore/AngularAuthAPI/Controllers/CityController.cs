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
    public class CityController : Controller
    {
        private readonly AppDbContext _appDbContext;
        private readonly IDateTime _dateTime;
        private readonly ILogger<CityController> logger;

        public CityController(AppDbContext appDbContext, IDateTime dateTime, ILogger<CityController> logger)
        {
            _appDbContext = appDbContext;
            _dateTime = dateTime;
            this.logger = logger;
        }

        [Authorize]
        [HttpPost("CreateCity")]
        public async Task<IActionResult> CreateCity(City city) 
        {
            if (city == null)
                return BadRequest();


            if (await CheckdistrictNameExistAsync(city.DistrictName))
                return BadRequest(new {Message = "District name already exists!"});

            await _appDbContext.Cities.AddAsync(city);

            await _appDbContext.SaveChangesAsync();

            logger.LogInformation("City created."+" Time: "+_dateTime.Now);

            return Ok(new { Message="City created." });
        }

        //[Authorize]
        [HttpGet("GetCities")]
        public async Task<ActionResult<City>> GetCities() 
        {
            try
            {
                if (_appDbContext.Cities == null) return NotFound();

                logger.LogInformation("CityGet called." + " Time: " + _dateTime.Now);
                return Ok(await _appDbContext.Cities.ToListAsync());
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
           
        }

        [Authorize]
        [HttpDelete("DeleteCity{id:int}")]
        public async Task<IActionResult> DeleteCityById(int id)
        {
            if (_appDbContext.Cities == null) return NotFound();

            var city = await _appDbContext.Cities.FindAsync(id);

            if (city == null) return NotFound();

            _appDbContext.Cities.Remove(city);

            await _appDbContext.SaveChangesAsync();

            logger.LogInformation("City deleted." + " Time: " + _dateTime.Now);

            return Ok(new { Message = "Deletion is done." });
        }

        [Authorize]
        [HttpPut("UpdateCity{id:int}")]
        public async Task<IActionResult> UpdateCityHttp(int id,[FromBody] City cityObj)
        {
            var city = await _appDbContext.Cities.FindAsync(id);

            if (city != null)
            {
                if (!string.IsNullOrEmpty(cityObj.CityId) && cityObj.CityId != "string")
                {
                    city.CityId = cityObj.CityId;
                }
                if (!string.IsNullOrEmpty(cityObj.CityName) && cityObj.CityName != "string")
                {
                    city.CityName = cityObj.CityName;
                }
                if (!string.IsNullOrEmpty(cityObj.CityLocation) && cityObj.CityLocation != "string")
                {
                    city.CityLocation = cityObj.CityLocation;
                }
                if ( !string.IsNullOrEmpty(cityObj.DistrictId) && cityObj.DistrictId != "string")
                {
                    city.DistrictId = cityObj.DistrictId;
                }
                if (!string.IsNullOrEmpty(cityObj.DistrictName) && cityObj.DistrictName != "string")
                {
                    if (await CheckdistrictNameExistAsync(cityObj.DistrictName))
                    {
                        return BadRequest(new { Message = "District name exists!" });
                    }
                    else
                    {
                        city.DistrictName = cityObj.DistrictName;
                    }
                }
                if (!string.IsNullOrEmpty(cityObj.DistrictAbout) && cityObj.DistrictAbout != "string")
                {
                    city.DistrictAbout = cityObj.DistrictAbout;
                }
                if (!string.IsNullOrEmpty(cityObj.DistrictLocation) && cityObj.DistrictLocation != "string")
                {
                    city.DistrictLocation = cityObj.DistrictLocation;
                }
                if (!string.IsNullOrEmpty(cityObj.DistrictImgUrl) && cityObj.DistrictImgUrl != "string")
                {
                    city.DistrictImgUrl = cityObj.DistrictImgUrl;
                }
                await _appDbContext.SaveChangesAsync();
                logger.LogInformation("Action Time: " + _dateTime.Now);
                return Ok();
            }
            return NotFound();
        }

        [Authorize]
        [HttpGet("GetCitiesByName")]
        public async Task<ActionResult<City>> GetCitiesByName(string name)
        {
            if (_appDbContext.Cities == null) return NotFound();

            return Ok(await _appDbContext.Cities.Where(s => s.CityName == name).ToListAsync());
        }

        [Authorize]
        [HttpGet("Search")]
        public async Task<IEnumerable<City>> SearchCity(string cityName)
        {
            IQueryable<City> query = _appDbContext.Cities;

            if (!string.IsNullOrEmpty(cityName))
            {
                query = query.Where(e => e.CityName.Contains(cityName));
            }

            return await query.ToListAsync();
        }

        private Task<bool> CheckdistrictNameExistAsync(string districtName)
            => _appDbContext.Cities.AnyAsync(x => x.DistrictName == districtName);
    }
}
