using AngularAuthAPI.Context;

namespace AngularAuthAPI
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionHandlerMiddleware> logger;

        public ExceptionHandlerMiddleware(RequestDelegate Next, ILogger<ExceptionHandlerMiddleware> Logger)
        {
            next = Next;
            logger = Logger;
        }

        public async Task Invoke(HttpContext httpcontext)
        {
            try
            {
                await next.Invoke(httpcontext);
            }
            catch (Exception ex)
            {
                //Error handling
                logger.LogError(ex.Message);
            }
        }
    }
}
