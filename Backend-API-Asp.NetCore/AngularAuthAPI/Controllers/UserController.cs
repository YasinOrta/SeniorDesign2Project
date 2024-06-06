using AngularAuthAPI.Context;
using AngularAuthAPI.Helpers;
using AngularAuthAPI.Models;
using AngularAuthAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace AngularAuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;
        private readonly IDateTime _dateTime;
        private readonly ILogger<UserController> logger;

        public UserController(AppDbContext appDbContext, IDateTime dateTime, ILogger<UserController> logger)
        {
            _authContext = appDbContext;
            _dateTime = dateTime;
            this.logger = logger;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] UserLogin userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Username == userObj.Username);
            var checkUserInputForEmail = await _authContext.Users.FirstOrDefaultAsync(x => x.Email == userObj.Username);


            if (checkUserInputForEmail != null)
            {
                user = await _authContext.Users.FirstOrDefaultAsync(x => x.Email == userObj.Username);
            }

            if (user == null)
                return NotFound(new { Message = "User not found!" });

            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                logger.LogWarning("Wrong password!");
                return BadRequest(new { Message = "Password is incorrect!" });
            }

            user.Token = CreateJwt(user);

            var logObj = CreateLogObj(user);
            logObj.LogDetail = "User: " + user.Username + ", has logged in.";
            logObj.OperationType = "Login";

            await _authContext.Logs.AddAsync(logObj);
            await _authContext.SaveChangesAsync();

            return Ok(new
            {
                Token = user.Token,
                Role = user.Role,
                Message = "Login Success!"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();


            //Check password strength
            var pass = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass.ToString() });

            //Check username
            if (await CheckUserNameExistAsync(userObj.Username))
                return BadRequest(new { Message = "Username already exists!" });

            //Check email
            if (await CheckUserEmailExistAsync(userObj.Email))
                return BadRequest(new { Message = "Email already exists!" });


            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Role = "User";
            userObj.Token = "";

            var logObj = CreateLogObj(userObj);
            logObj.LogDetail = "User: " + userObj.Username + ", has registered.";
            logObj.OperationType = "Register";

            await _authContext.Users.AddAsync(userObj);

            await _authContext.Logs.AddAsync(logObj);

            await _authContext.SaveChangesAsync();

            return Ok(new
            {
                Message = "User Registered!"
            });
        }

        [Authorize]
        [HttpPut("UpdateUser{id:int}")]
        public async Task<IActionResult> UpdateUser(int id,[FromBody] UpdateUserContextRequest updateUserContextRequest)
        {
            var user = await _authContext.Users.FindAsync(id);

            if (user != null)
            {   

                if(!string.IsNullOrEmpty(updateUserContextRequest.Username))
                {
                    if (await CheckUserNameExistAsync(updateUserContextRequest.Username))
                        return BadRequest(new { Message = "Username already exists!" });

                    var logObj = CreateLogObj(user);

                    logObj.LogDetail = "User: " + user.Username + ", Id: " + user.Id + ", has updated username to: " + updateUserContextRequest.Username;
                    logObj.OperationType = "Update";

                    user.Username = updateUserContextRequest.Username;

                    await _authContext.Logs.AddAsync(logObj);
                }                  
                if(!string.IsNullOrEmpty(updateUserContextRequest.FirstName)) 
                {
                    var logObj = CreateLogObj(user);

                    logObj.LogDetail = "User: " + user.Username + ", Id: " + user.Id + ", has updated first name to: " + updateUserContextRequest.FirstName;
                    logObj.OperationType = "Update";

                    user.FirstName = updateUserContextRequest.FirstName;
                    
                    await _authContext.Logs.AddAsync(logObj);
                }
                if (!string.IsNullOrEmpty(updateUserContextRequest.LastName))
                {
                    var logObj = CreateLogObj(user);

                    logObj.LogDetail = "User: " + user.Username + ", Id: " + user.Id + ", has updated last name to: " + updateUserContextRequest.LastName;
                    logObj.OperationType = "Update";

                    user.LastName = updateUserContextRequest.LastName;

                    await _authContext.Logs.AddAsync(logObj);
                }
                if(!string.IsNullOrEmpty(updateUserContextRequest.Email))
                {
                    if (await CheckUserEmailExistAsync(updateUserContextRequest.Email))
                        return BadRequest(new { Message = "Email already exists!" });
                    
                    var logObj = CreateLogObj(user);

                    logObj.LogDetail = "User: " + user.Username + ", Id: " + user.Id + ", has updated email to: " + updateUserContextRequest.Email;
                    logObj.OperationType = "Update";

                    user.Email = updateUserContextRequest.Email;

                    await _authContext.Logs.AddAsync(logObj);
                }
                if(!string.IsNullOrEmpty(updateUserContextRequest.Password))    
                {
                    var pass = CheckPasswordStrength(updateUserContextRequest.Password);
                    if (!string.IsNullOrEmpty(pass))
                        return BadRequest(new { Message = pass.ToString() });

                    var logObj = CreateLogObj(user);

                    logObj.LogDetail = "User: " + user.Username + ", Id: " + user.Id + ", has updated password to: " + updateUserContextRequest.Password;
                    logObj.OperationType = "Update";

                    user.Password = PasswordHasher.HashPassword(updateUserContextRequest.Password);

                    await _authContext.Logs.AddAsync(logObj);
                }
                if (!string.IsNullOrEmpty(updateUserContextRequest.Role))
                {
                    var logObj = CreateLogObj(user);

                    logObj.LogDetail = "User: " + user.Username + ", Id: " + user.Id + ", has updated role to: " + updateUserContextRequest.Role;
                    logObj.OperationType = "Update";

                    user.Role = updateUserContextRequest.Role;

                    await _authContext.Logs.AddAsync(logObj);
                }

                await _authContext.SaveChangesAsync();
                Console.WriteLine("Action time: " + _dateTime.Now);
                return Ok();
            }
            return NotFound();
        }

        [Authorize]/*this command protects api, unless authorization it cannot be used*/
        [HttpGet("GetUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            try 
            {
                if (_authContext.Users == null)
                    return NotFound();

                logger.LogInformation("Getting users...");

                return await _authContext.Users.ToListAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //Gets every user 
        //[Authorize]
        [HttpGet("GetAllUsers")]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            return Ok(await _authContext.Users.ToListAsync());
        }

        [Authorize]
        [HttpGet("GetUserById")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            if (_authContext.Users == null) return NotFound();

            var user = await _authContext.Users.FindAsync(id);
            if (user == null) return NotFound();

            return user;
        }

        //[Authorize]
        [HttpDelete("DeleteUser{id:int}")]
        public async Task<IActionResult> DeleteUserById(int id)
        {
            if (_authContext.Users == null) return NotFound();

            var user = await _authContext.Users.FindAsync(id);

            if (user == null) return NotFound();

            _authContext.Users.Remove(user);

            var logObj = CreateLogObj(user);
            logObj.LogDetail = "User: " + user.Username + ", has deleted the account.";
            logObj.OperationType = "Delete";

            await _authContext.Logs.AddAsync(logObj);

            await _authContext.SaveChangesAsync();

            return Ok();
        }

        //above part

        //checks whether given id is in the database or not
        private bool UserAvailable(int id)
        {
            return (_authContext.Users?.Any(x => x.Id == id)).GetValueOrDefault();
        }

        private bool UserCheckWithEmail(string email)
        {
            return (_authContext.Users?.Any(x => x.Email == email)).GetValueOrDefault();
        }

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if(password.Length < 6)
            {
                sb.Append("Minumum password length should be 6!" + Environment.NewLine);
            }
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password,"[0-9]")))
                sb.Append("Password should be Alphanumerical!"+Environment.NewLine);
            if (!Regex.IsMatch(password, "[<,>]"))//more special characters can be added
                sb.Append("Password should contain special characters!" + Environment.NewLine);


            return sb.ToString();
        }
        

        private Task<bool> CheckUserNameExistAsync(string username) 
            => _authContext.Users.AnyAsync(x => x.Username == username);

        private Task<bool> CheckUserEmailExistAsync(string email)
            => _authContext.Users.AnyAsync(x => x.Email == email);

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("...getfixedboi...deltaSequencePrimeOO");
            var identiy = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identiy,
                Expires = DateTime.Now.AddMinutes(60),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private Log CreateLogObj(User userObj)
        {
            var logObj = new Log
            {
                FirstName = userObj.FirstName,
                LastName = userObj.LastName,
                Email = userObj.Email,
                Role = userObj.Role,
                Token = userObj.Token,
                Username = userObj.Username,
                Password = userObj.Password,
                DateTime = _dateTime.Now,
                LogDetail = "User: " + userObj.Username + ", has registered."
            };

            return logObj;
        }
    }
}
