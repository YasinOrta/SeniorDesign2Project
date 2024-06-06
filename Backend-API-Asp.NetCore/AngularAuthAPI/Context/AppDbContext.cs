using AngularAuthAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularAuthAPI.Context
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Log> Logs { get; set; }

        public DbSet<MiddlewareLog> MiddlewareLogs { get; set; }

        public DbSet<City> Cities { get; set; }

        public DbSet<Province> Provinces { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Log>().ToTable("logs");
            modelBuilder.Entity<MiddlewareLog>().ToTable("middlewareLogs");
            modelBuilder.Entity<City>().ToTable("cities");
            modelBuilder.Entity<Province>().ToTable("provinces");
        }
    }
}
