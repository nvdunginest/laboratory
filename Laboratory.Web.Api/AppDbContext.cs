using Laboratory.Web.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Laboratory.Web.Api
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Request> Requests { get; set; }
        public DbSet<RequestLog> RequestLogs { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
    }
}