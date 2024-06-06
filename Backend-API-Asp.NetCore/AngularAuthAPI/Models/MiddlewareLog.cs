using System.ComponentModel.DataAnnotations;

namespace AngularAuthAPI.Models
{
    public class MiddlewareLog
    {
        [Key]
        public int Id { get; set; }

        public string RequestMethod{ get; set; } = "";

        public string RequestPath { get; set; } = "";

        public string RequestHost { get; set; } = "";

        public string RequestProtocol { get; set; } = "";

        public string ConnectionId { get; set; } = "";

        public string LocalPort { get; set; } = "";

        public string RemotePort { get; set; } = "";

        public string LocalIpAddress { get; set; } = "";

        public string RemoteIpAddress { get; set; } = "";

        public string Endpoint { get; set; } = "";

        public int ResponseStatusCode { get; set; }

        public DateTime DateTime { get; set; }
    }
}
