using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Services
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=notes;Trusted_Connection=True;");
        }

        public DbSet<Note> Notes { get; set; }
    }
}
