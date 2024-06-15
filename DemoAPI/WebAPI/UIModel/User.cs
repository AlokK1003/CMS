using System.ComponentModel.DataAnnotations;

namespace WebAPI.UIModel
{
    public class User
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
