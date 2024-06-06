using System.ComponentModel.DataAnnotations;

namespace AngularAuthAPI.Models
{
    public class Log
    {
        [Key]
        public int Id { get; set; }

        public string LogDetail { get; set; } = "";

        public string FirstName { get; set; } = "";

        public string LastName { get; set; } = "";

        public string Username { get; set; } = "";

        public string Password { get; set; } = "";

        public string Token { get; set; } = "";

        public string Role { get; set; } = "";

        public string Email { get; set; } = "";

        public DateTime DateTime { get; set; }

        public string OperationType { get; set; } = "";
    }
}
