using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotNetServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhuNhaController : ControllerBase
    {
        private IKhuNhaRepository _khuNhaRepository;

        public KhuNhaController(IKhuNhaRepository khuNhaRepository)
        {
            _khuNhaRepository = khuNhaRepository;
        }

        [HttpGet]
        [Route("getall")]
        public IActionResult Get()
        {
            var data = _khuNhaRepository.GetAll();

            return Ok(new
            {
                data
            });
        }
    }
}
