using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class CardContext :  IdentityDbContext<User>
    {
        public DbSet<Card> Cards { get; set; }
        public CardContext(DbContextOptions<CardContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
