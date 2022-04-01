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
            if (Request == null)
            {
                return "Request is null";
            }

            if (Request.Form == null)
            {
                return "Request->Form is null";
            }

            if (Request.Form.Files == null)
            {
                return "Request->Form->Files is null";
            }

            IFormFile file = Request.Form.Files.FirstOrDefault();

            if (file == null)
            {
                return "No files";
            }

            return $"Received file {file.FileName} with size in bytes {file.Length}";
        }
    }
}
