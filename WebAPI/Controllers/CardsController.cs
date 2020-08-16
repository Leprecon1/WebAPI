using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;

// добавить валидацию и дизайн
namespace WebAPIApp.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardsController : ControllerBase
    {
        CardContext db;
        
        public CardsController(CardContext context)
        {
            db = context;
            if (!db.Cards.Any())
            {
                db.Cards.Add(new Card { Owner = "Tom", Number = "5211 4589 6322 0047", 
                    Term ="05/23", CVV="123" });
                db.Cards.Add(new Card { Owner = "Alice", Number = "5322 1549 3221 4323", 
                    Term="03/22", CVV="182"});
                db.SaveChanges();
            }
        }

        /// <summary>
        /// Get all catds
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Card>>> Get()
        {
            return await db.Cards.ToListAsync();
        }

       /// <summary>
       /// Get card to specific id
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> Get(int id)
        {
            Card card = await db.Cards.FirstOrDefaultAsync(x => x.Id == id);
            if (card == null)
                return NotFound();
            return new ObjectResult(card);
        }

        /// <summary>
        /// Post card to objedct card
        /// </summary>
        /// <param name="card"></param>
        [HttpPost]
        public async Task<ActionResult<Card>> Post(Card card)
        {
            if (card == null)
            {
                return BadRequest();
            }

            if (card.Owner == "Ilya Cherkasov")
            {
                ModelState.AddModelError("Owner", "Недопустимое имя владельца - Ilya Cherkasov");
            }
           
            if (!ModelState.IsValid)
            {    
                 return BadRequest(ModelState);
            }

            db.Cards.Add(card);
            await db.SaveChangesAsync();
            return Ok(card);
        }

        /// <summary>
        /// put card to Object card
        /// </summary>
        /// <param name="card"></param>
        [HttpPut]
        public async Task<ActionResult<Card>> Put(Card card)
        {
            if (card == null)
            {
                return BadRequest();
            }
            if (!db.Cards.Any(x => x.Id == card.Id))
            {
                return NotFound();
            }

            db.Update(card);
            await db.SaveChangesAsync();
            return Ok(card);
        }
        
        /// <summary>
        /// Delete card to speciic item
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        public async Task<ActionResult<Card>> Delete(int id)
        {
            Card card = db.Cards.FirstOrDefault(x => x.Id == id);
            if (card == null)
            {
                return NotFound();
            }
            db.Cards.Remove(card);
            await db.SaveChangesAsync();
            return Ok(card);
        }
   
    }
}