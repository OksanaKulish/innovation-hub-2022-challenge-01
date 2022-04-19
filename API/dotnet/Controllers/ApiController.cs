using System;
using System.IO;
using System.Linq;
using System.Net;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace dotnet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        private static bool isCanceled;
        private readonly ILogger<ApiController> _logger;
        public ApiController(ILogger<ApiController> logger) => _logger = logger;

        [HttpGet("gettest")]
        public dynamic GetTest()
        {
            _logger.LogInformation($"Called API method 'GetTest'");
            var ipHostInfo = Dns.GetHostEntry(Dns.GetHostName()); // `Dns.Resolve()` method is deprecated.
            var ipAddresses = string.Join(";", ipHostInfo.AddressList.Where(a => !a.IsIPv6LinkLocal).Select(a => a.ToString()));
            return new
            {
                Date = DateTime.Now,
                Responser = GetType().Name,
                IpAddresses = ipAddresses,
                Status = "Ok"
            };
        }
        [HttpGet("getcpuusage")]
        public dynamic CpuUsage()
        {
            _logger.LogInformation($"Called API method 'CpuUsage'");
            double count = 0;
            isCanceled = false;
            while (!isCanceled)
            {
                var trunc = Math.Truncate(count / 10000);
                if (count == trunc * 1000)
                {
                    var t = MathF.Sqrt((float)count);
                    var t1 = MathF.Atan2((float)count, t);
                    _logger.LogInformation($"Step is: {count}");
                    _logger.LogInformation($"MathF.Sqrt is: {t}; MathF.Atan2 is: {t1}");
                }
                count++;
            }
            return Ok("Stopped");
        }
        [HttpGet("stopcpuusage")]
        public dynamic StopCpuUsage()
        {
            isCanceled = true;
            return Ok("Stopping");
        }

        [HttpPost()]
        public object FileUpload()
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

            StreamReader reader = new StreamReader(file.OpenReadStream());

            var id = Guid.NewGuid().ToString();

            var content = reader.ReadToEnd();
            AmazonS3Client client = new AmazonS3Client();
            var result = client.PutObjectAsync(new PutObjectRequest
            {
                BucketName = "angular-simple-ui",
                Key = $"csvfiles/{id}",
                ContentBody = content
            }).Result;

            return new
            {
                url = $"https://angular-simple-ui.s3.eu-west-2.amazonaws.com/csvfiles/{id}"
            };
        }

    }
}
