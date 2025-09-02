using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using GiftsFromBaikal.Auth.Data;

var builder = WebApplication.CreateBuilder(args);

// EF
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite("Data Source=auth.db"));

// JWT
var key = Encoding.UTF8.GetBytes("super_secret_key_1234567890123456");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173") // фронт
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials(); // если используешь cookie
        });
});


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("AllowLocalhost");
app.MapControllers();
app.Run();