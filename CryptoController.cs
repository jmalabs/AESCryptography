using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cryptography.WebUi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cryptography.WebUi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CryptoController : ControllerBase
    {
        private readonly string _key = "jGIw0TblynaMYjDRNuXKdiste1riAAGU";
        private readonly ICryptoService _cryptoService;

        public CryptoController(ICryptoService cryptoService)
        {
            _cryptoService = cryptoService;
        }

        [HttpPost("encrypt")]
        public async Task<IActionResult> Encrypt([FromBody]string text)
        {
            try
            {
                string encrypted = await _cryptoService.Encrypt(text, _key);

                return Ok(encrypted);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost("decrypt")]
        public async Task<IActionResult> Decrypt([FromBody]string text)
        {
            try
            {
                string decrypted = await _cryptoService.Decrypt2(text, _key);

                return Ok(decrypted);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}