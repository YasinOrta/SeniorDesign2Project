using System.ComponentModel.DataAnnotations;

namespace AngularAuthAPI.Models
{
    public class Province
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public string Vehicle_Registration_Plate { get; set; } = "";

        public string Region_Location { get; set; } = "";

        public string PopularFoods { get; set; } = "";

        public string PopularProducedItems { get; set; } = "";

        public string Population { get; set; } = "";

        public string IsCapitalCity { get; set; } = "";

        public string imgUrl { get; set; } = "";

        public string About { get; set; } = "";
    }
}
