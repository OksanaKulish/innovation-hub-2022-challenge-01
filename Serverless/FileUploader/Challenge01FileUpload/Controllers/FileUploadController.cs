using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Challenge01FileUpload.Controllers
{
    [Route("api/[controller]")]
    public class FileUploadController : ControllerBase
    {
        [HttpGet()]
        public string ListAll()
        {
            return "ok";
        }

        [HttpPost()]
        public string Post()
        {
            IFormFile file = Request.Form.Files.FirstOrDefault();

            return $"Received file {file.FileName} with size in bytes {file.Length}";
        }
    }
}
