using System.ComponentModel.DataAnnotations;

namespace AngularAuthAPI.Models
{
    public class City
    {
        [Key]
        public int Id { get; set; }

        public string CityId { get; set; } = "";

        public string CityName { get; set; } = "";

        public string CityLocation { get; set; } = "";

        public string DistrictId { get; set; } = "";

        public string DistrictName { get; set; } = "";

        public string DistrictAbout { get;  set; } = "";

        public string DistrictLocation { get; set; } = "";

        public string DistrictImgUrl { get; set; } = "";
    }
}
