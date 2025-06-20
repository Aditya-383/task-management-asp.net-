using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Linq;
using System;
using task_app.Services;

namespace task_app.Middleware
{
    public class UserAuthenticationMiddleware
    {
        private readonly RequestDelegate _next;

        public UserAuthenticationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

                if (string.IsNullOrEmpty(token))
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsJsonAsync(new { error = "Token not found!" });
                    return;
                }

              
                var jwt = context.RequestServices.GetRequiredService<JwtService>();
                var userService = context.RequestServices.GetRequiredService<UserService>();

                var userId = jwt.GetUserIdFromToken(token);
                var user = await userService.GetUserByIdAsync(userId);

                if (user == null || user.Role != "User")
                {
                    context.Response.StatusCode = 403;
                    await context.Response.WriteAsJsonAsync(new { error = "You are not an authorized user!" });
                    return;
                }

                context.Items["User"] = user;
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsJsonAsync(new { error = "Authentication error", detail = ex.Message });
                return;
            }

            await _next(context);
        }
    }
}
