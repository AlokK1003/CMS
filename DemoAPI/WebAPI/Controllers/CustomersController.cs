using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.UIModel;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController,Authorize]
    public class CustomersController : ControllerBase
    {
        //private readonly ILogger<CustomersController> _logger;
        private readonly DbContextClass _context;
        public CustomersController(DbContextClass context)
        {
            _context = context;
        }
        /// <summary>
        /// GET ALL API
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Model.Customers>>> Get()
        {
            var customerData = new List<Model.Customers>();
            var customer = await _context.Customers.ToListAsync();
            if (customer.Count > 0)
                customerData = customer;
            
            return customerData;
        }
        /// <summary>
        /// Get BY ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        [HttpGet("{id}")]
        public async Task<ActionResult<Model.Customers>> Get(int id)
        {
            var customerData = new Model.Customers();
            customerData = await _context.Customers.FindAsync(id);
            return customerData;
        }
        /// <summary>
        /// POST Data
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>

        [HttpPost]
        public async Task<ActionResult<CustomerForm>> POST(CustomerForm customer)
        {
            try
            {
                Model.Customers cusData = new Model.Customers();
                cusData.FirstName = customer.FirstName;
                cusData.LastName = customer.LastName;
                cusData.Email = customer.Email;
                cusData.Phone = customer.Phone;
                cusData.Address = customer.Address;
                cusData.AdditionalRequirement = customer.AdditionalRequirement;
                cusData.IsActive = true;
                cusData.CreatedBy = customer.CreatedBy;
                cusData.CreatedDate = DateTime.Now;
                _context.Customers.Add(cusData);

                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(Get), new { id = cusData.CustomersId }, cusData);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// Delete Data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Model.Customers>>> Delete(int id)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(id);
                if (customer == null)
                    return NotFound();

                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();
                return await _context.Customers.ToListAsync();
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// Update Data
        /// </summary>
        /// <param name="id"></param>
        /// <param name="customer"></param>
        /// <returns></returns>

        [HttpPut("{id}")]
        public async Task<ActionResult<IEnumerable<Model.Customers>>> Put(int id, Model.Customers customer)
        {
            if (id != customer.CustomersId)
                return BadRequest();

            var customerData = await _context.Customers.FindAsync(id);
            if (customerData == null)
                return NotFound();

            customerData.FirstName = customer.FirstName;
            customerData.LastName = customer.LastName;
            customerData.Email = customer.Email;
            customerData.Phone = customer.Phone;
            customerData.Address = customer.Address;
            customerData.AdditionalRequirement = customer.AdditionalRequirement;
            customerData.IsActive = true;
            customerData.UpdatedBy = customer.CreatedBy;
            customerData.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();
            return await _context.Customers.ToListAsync();
        }
        [HttpGet]
        [Route("UserDashboardDetails")]
        public async Task<ActionResult<UserDashboard>> UserDashboardDetails(int id)
        {
            UserDashboard userDashboard = new UserDashboard();
            try
            {
                var userDashboardData = await _context.Customers.ToListAsync();
                userDashboard.TotalCustomer = userDashboardData.Count();
                userDashboard.ActiveCustomer = userDashboardData.Where(x => x.IsActive == true).Count();
                userDashboard.InActiveCustomer = userDashboardData.Where(x => x.IsActive == false).Count();
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, ex.Message);
            }
            return userDashboard;
        }
    }
}
