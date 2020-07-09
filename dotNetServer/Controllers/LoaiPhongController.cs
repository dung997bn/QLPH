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
    public class LoaiPhongController : ControllerBase
    {
        private ILoaiPhongRepository _loaiPhongRepository;
        public LoaiPhongController(ILoaiPhongRepository loaiPhongRepository)
        {
            _loaiPhongRepository = loaiPhongRepository;
        }

        [HttpGet]
        [Route("getall")]
        public IActionResult Get()
        {
            var data = _loaiPhongRepository.GetAll();

            return Ok(new
            {
                data
            });
        }
    }
}
