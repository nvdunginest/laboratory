using Laboratory.Web.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Laboratory.Web.Api.Controllers;

[ApiController]
[Route("api/requests")]
public class RequestsController : ControllerBase
{
    private readonly AppDbContext _context;
    public RequestsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAsync()
    {
        return Ok(await _context.Requests.Include(x => x.Logs).Include(x => x.Attachments).ToListAsync());
    }

    [Route("{requestId}")]
    [HttpGet]
    public async Task<IActionResult> GetByIdAsync([FromRoute] Guid requestId, [FromQuery] string email, [FromQuery] string phone)
    {
        var request = await _context.Requests.FirstOrDefaultAsync(x => x.Id == requestId);
        if (request == null) return BadRequest();

        if (request.OwnerEmail != email || request.OwnerPhone != phone) return BadRequest();

        return Ok(request);
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] CreateRequestModel model)
    {
        var request = new Request(model.OwnerEmail, model.OwnerPhone);

        _context.Requests.Add(request);

        await _context.SaveChangesAsync();

        return Ok(request.Id);
    }

    [Route("{requestId}/receive")]
    [HttpPut]
    public async Task<IActionResult> Receive([FromRoute] Guid requestId, [FromBody] ReceiveModel model)
    {
        var request = await _context.Requests.FirstOrDefaultAsync(x => x.Id == requestId);
        if (request == null) return BadRequest();

        request.Receive(model.User);
        _context.Requests.Update(request);

        await _context.SaveChangesAsync();

        return Ok();
    }

    [Route("{requestId}/close")]
    [HttpPut]
    public async Task<IActionResult> Close([FromRoute] Guid requestId, [FromBody] ReceiveModel model)
    {
        var request = await _context.Requests.FirstOrDefaultAsync(x => x.Id == requestId);
        if (request == null) return BadRequest();

        request.Close(model.User);
        _context.Requests.Update(request);

        await _context.SaveChangesAsync();

        return Ok();
    }
}

public class CreateRequestModel
{
    public string OwnerEmail { get; set; }
    public string OwnerPhone { get; set; }
}

public class ReceiveModel
{
    public string User { get; set; }
}