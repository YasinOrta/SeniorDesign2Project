using AngularAuthAPI.Context;
using AngularAuthAPI.Models;
using AngularAuthAPI.Services;

namespace AngularAuthAPI
{
    public class RequestResponseMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<RequestResponseMiddleware> logger;
        private readonly IDateTime _dateTime;
        public RequestResponseMiddleware(RequestDelegate Next ,ILogger<RequestResponseMiddleware> Logger, IDateTime dateTime)
        {
            next = Next;
            logger = Logger;
            _dateTime = dateTime;
        }

        public async Task Invoke(HttpContext httpcontext, AppDbContext _authContext)
        {
            
            var middlewarelogObj = new MiddlewareLog
            {
                RequestMethod = "",
                RequestPath = "",
                RequestHost = "",
                RequestProtocol = "",
                ConnectionId = "",
                LocalPort = "",
                RemotePort = "",
                LocalIpAddress = "",
                RemoteIpAddress = "",
                Endpoint = "",
                ResponseStatusCode = 0,
                DateTime = _dateTime.Now,
            };

            //logger.LogInformation($"{httpcontext.Request.HttpContext.User.Identity.IsAuthenticated}");

            middlewarelogObj.RequestMethod = ($"{httpcontext.Request.HttpContext.Request.Method}");
            middlewarelogObj.RequestPath = ($"{httpcontext.Request.HttpContext.Request.HttpContext.Request.Path}");
            middlewarelogObj.RequestHost = ($"{httpcontext.Request.HttpContext.Request.Host}");
            middlewarelogObj.RequestProtocol = ($"{httpcontext.Request.HttpContext.Request.Protocol}");
            middlewarelogObj.ConnectionId = ($"{httpcontext.Request.HttpContext.Connection.Id}");
            middlewarelogObj.LocalPort = ($"{httpcontext.Request.HttpContext.Connection.LocalPort}");
            middlewarelogObj.RemotePort = ($"{httpcontext.Request.HttpContext.Connection.RemotePort}");
            middlewarelogObj.LocalIpAddress = ($"{httpcontext.Request.HttpContext.Connection.LocalIpAddress}");
            middlewarelogObj.RemoteIpAddress = ($"{httpcontext.Request.HttpContext.Connection.RemoteIpAddress}");
            middlewarelogObj.Endpoint = ($"{httpcontext.Request.HttpContext.GetEndpoint()}");
            middlewarelogObj.ResponseStatusCode = httpcontext.Response.StatusCode;
            middlewarelogObj.DateTime = _dateTime.Now;        

            await _authContext.MiddlewareLogs.AddAsync(middlewarelogObj);

            await next.Invoke(httpcontext); // response is created here

            logger.LogInformation("Logs are created and saved to db in middleware!"+",Time: "+_dateTime.Now);

        }
    }
}
