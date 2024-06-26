﻿using System.ComponentModel.DataAnnotations;

namespace AngularAuthAPI.Models
{
    public class UpdateUserContextRequest
    {
        public string FirstName { get; set; } = "";

        public string LastName { get; set; } = "";

        public string Username { get; set; } = "";

        public string Password { get; set; } = "";

        public string Role { get; set; } = "";

        public string Email { get; set; } = "";
    }
}
