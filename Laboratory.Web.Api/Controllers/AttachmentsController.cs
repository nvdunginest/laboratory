using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace Laboratory.Web.Api.Controllers;

[ApiController]
[Route("api/requests/{requestId}/attachments")]
public class AttachmentsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ResponseContext _responseData;

    private string tempFolder;
    private readonly string TEMP_FOLDER_NAME = "/Temp";
    public int chunkSize;
    public AttachmentsController(AppDbContext context)
    {
        chunkSize = 1048576 * Convert.ToInt32(10000);
        _context = context;
        _responseData = new ResponseContext();
        tempFolder = "Uploads";
    }

    [HttpGet("{id}/download")]
    public async Task<IActionResult> DownloadFileById([FromRoute] Guid requestId, [FromRoute] Guid id)
    {
        try
        {
            var exist = await _context.Attachments.Where(x => x.Id == id && x.RequestId == requestId).SingleOrDefaultAsync();
            if (exist != null)
            {
                string fullPath = Path.Combine(exist.FilePath, exist.Filename);
                if (System.IO.File.Exists(fullPath))
                {
                    var memory = new MemoryStream();
                    using (var stream = new FileStream(fullPath, FileMode.Open))
                    {
                        await stream.CopyToAsync(memory);
                    }
                    memory.Position = 0;
                    var fileExtensionProvider = new FileExtensionContentTypeProvider();
                    string contentType = "";
                    if (fileExtensionProvider.TryGetContentType(exist.Filename, out contentType))
                    {
                        return File(memory, contentType, exist.Filename);
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
            }
            return NotFound();

        }
        catch (Exception ex)
        {
            return BadRequest($"Error downloading file: {ex.Message}");
        }

    }


    [HttpPost("start-session")]
    public async Task<IActionResult> UploadChunks([FromRoute] string requestId, [FromQuery] string id, [FromQuery] string fileName)
    {
        try
        {
            var pathSaveTempFile = tempFolder + TEMP_FOLDER_NAME + $"/{requestId}";
            if (!Directory.Exists(pathSaveTempFile))
            {
                Directory.CreateDirectory(pathSaveTempFile);
                Directory.CreateDirectory(tempFolder + $"/{requestId}");
            }
            var chunkNumber = id;
            string newPath = Path.Combine(pathSaveTempFile, fileName + chunkNumber);
            using (FileStream fs = System.IO.File.Create(newPath))
            {
                byte[] bytes = new byte[chunkSize];
                int bytesRead = 0;

                while ((bytesRead = await Request.Body.ReadAsync(bytes, 0, bytes.Length)) > 0)
                {
                    fs.Write(bytes, 0, bytesRead);
                }
            }
        }
        catch (Exception ex)
        {
            _responseData.ErrorMessage = ex.Message;
            _responseData.IsSuccess = false;
        }
        return Ok(_responseData);
    }

    [HttpPost("finish-session")]
    public async Task<IActionResult> UploadCompleteAsync([FromRoute] Guid requestId, [FromQuery] string fileName, [FromQuery] string fileRealName)
    {
        try
        {
            string tempPath = tempFolder + "/Temp" + $"/{requestId}";
            string newPath = Path.Combine(tempPath, fileName);
            string endPath = tempFolder + $"/{requestId}";
            string[] filePaths = Directory.GetFiles(tempPath).Where(p => p.Contains(fileName)).OrderBy(p => Int32.Parse(p.Replace(fileName, "$").Split('$')[1])).ToArray();
            foreach (string filePath in filePaths)
            {
                MergeChunks(newPath, filePath);
            }
            System.IO.File.Move(Path.Combine(tempPath, fileName), Path.Combine(endPath, fileRealName));
            DirectoryInfo d = new DirectoryInfo(tempFolder + $"/{requestId}");

            var fullFilePath = Path.Combine(endPath, fileRealName);

            var request = await _context.Requests.FirstOrDefaultAsync(x => x.Id == requestId);

            if (request != null)
            {
                request.Attachment(endPath, fileRealName);
                _context.Update(request);
                await _context.SaveChangesAsync();
            }

        }
        catch (Exception ex)
        {
            _responseData.ErrorMessage = ex.Message;
            _responseData.IsSuccess = false;
        }
        return Ok(_responseData);
    }

    private static void MergeChunks(string chunk1, string chunk2)
    {
        FileStream fs1 = null;
        FileStream fs2 = null;
        try
        {
            fs1 = System.IO.File.Open(chunk1, FileMode.Append);
            fs2 = System.IO.File.Open(chunk2, FileMode.Open);
            byte[] fs2Content = new byte[fs2.Length];
            fs2.Read(fs2Content, 0, (int)fs2.Length);
            fs1.Write(fs2Content, 0, (int)fs2.Length);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message + " : " + ex.StackTrace);
        }
        finally
        {
            if (fs1 != null) fs1.Close();
            if (fs2 != null) fs2.Close();
            System.IO.File.Delete(chunk2);
        }
    }
}

public class ResponseContext
{
    public dynamic Data { get; set; }
    public bool IsSuccess { get; set; } = true;
    public string ErrorMessage { get; set; }
}