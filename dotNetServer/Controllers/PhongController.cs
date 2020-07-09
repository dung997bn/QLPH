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
    public class PhongController : ControllerBase
    {
        private IPhongRepository _phongRepository;

        public PhongController(IPhongRepository phongRepository)
        {
            _phongRepository = phongRepository;
        }

        [HttpGet]
        [Route("getall")]
        public IActionResult GetAllRoom()
        {
            var data = _phongRepository.GetAll();

            return Ok(new
            {
                data
            });
        }
    }
}
