using GiftsFromBaikal.Auth.Models;
using Microsoft.EntityFrameworkCore;

namespace GiftsFromBaikal.Auth.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) :  base(options){}

    public DbSet<User> Users => Set<User>();
}