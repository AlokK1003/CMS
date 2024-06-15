using System.ComponentModel.DataAnnotations;

namespace WebAPI.UIModel
{
    public class CustomerForm
    {
        [Required]
        public int CustomersId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
        public string Address { get; set; }
        public string AdditionalRequirement { get; set; }

        [Required]
        public int CreatedBy { get; set; }
    }
}
