using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace WebAPI.Model
{
    public class Customers
    {
        [Key]
        [Required]
        public int CustomersId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string AdditionalRequirement { get; set; }

        [DefaultValue(true)]
        public bool IsActive { get; set; }
        [Required]
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
