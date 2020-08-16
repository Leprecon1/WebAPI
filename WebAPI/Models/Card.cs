using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Card
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Укажите владельца карты")]
        public string Owner { get; set; }
        [Column(TypeName ="nvarchar(20)")]
        [Required(ErrorMessage = "Укажите номер карты")]
        public string Number { get; set; }
        [Column(TypeName = "nvarchar(5)")]
        [Required(ErrorMessage = "Укажите номер карты")]
        public string Term { get; set; }
        [Column(TypeName = "nvarchar(3)")]
        [Required(ErrorMessage = "Укажите CVV код")]
        public string CVV { get; set; }
    }
}
