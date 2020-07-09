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
    public class LanhDaoController : ControllerBase
    {
        private ILanhDaoRepository _lanhDaoRepository;

        public LanhDaoController(ILanhDaoRepository lanhDaoRepository)
        {
            _lanhDaoRepository = lanhDaoRepository;
        }
        [HttpGet]
        [Route("getall")]
        public IActionResult Get()
        {
            var data = _lanhDaoRepository.GetAll();

            return Ok(new
            {
                data
            });
        }

        [HttpGet]
        [Route("get")]
        public IActionResult Get(int Id)
        {
            var data = _lanhDaoRepository.GetById(Id);

            return Ok(new
            {
                data
            });
        }
    }
}
