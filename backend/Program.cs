using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


// --- Аутентификация JWT
const string jwtIssuer = "GiftsFromBaikal";
const string jwtAudience = "GiftsFromBaikal";
var jwtKey = builder.Configuration["JwtKey"] ?? "GiftsFromBaikalSuperSecretKey1234";
var jwtKeyBytes = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(jwtKeyBytes),
            ClockSkew = TimeSpan.FromSeconds(30)
        };
    });

builder.Services.AddAuthorization();

// Сздание SQLite DataBase
const string sqliteConnectionString = "Data Source=database.db;Cache=Shared";


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(sqliteConnectionString));

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

// --- Создаем базу (если нет) и настраиваем PRAGMA
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    try
    {
        db.Database.ExecuteSqlRaw("PRAGMA journal_mode=WAL;");
    }
    catch
    {
        // безопасно игнорируем ошибки при старых версиях/окружениях
    }
}

// --- Root point
app.MapGet("/", () => "GiftsFromBaikal API (SQLite) - up");


public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options);