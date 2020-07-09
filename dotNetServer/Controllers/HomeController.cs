using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Interfaces;
using Domain.ViewModels.Weekly;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotNetServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private IWeeklyTableRepository _weeklyTableRepository;
        private IDailyTableRepository _dailyTableRepository;

        public HomeController(IWeeklyTableRepository weeklyTableRepository, IDailyTableRepository dailyTableRepository)
        {
            _weeklyTableRepository = weeklyTableRepository;
            _dailyTableRepository = dailyTableRepository;
        }

        [HttpGet]
        [Route("index")]
        public IActionResult Get(string toDay, int IdKhuNha = 0, int IdLoaiPhong = 0)
        {
            DateTime date;
            WeeklyTable data = null;
            if (String.IsNullOrEmpty(toDay))
            {
                date = DateTime.Today.AddDays(-(((int)DateTime.Today.DayOfWeek) + 6) % 7);
            }
            else
            {
                date = DateTime.Parse(toDay);
            }

            data = _weeklyTableRepository.GetWeeklyTable(IdKhuNha, IdLoaiPhong, date);

            return Ok(new
            {
                data
            });
        }

        [HttpGet]
        [Route("index/daily")]
        public IActionResult GetDailyTable(int IdKhuNha = 0, int IdLoaiPhong = 0, DateTime? date = null)
        {
            if (date == null)
            {
                date = DateTime.Today;
            }


            var data = _dailyTableRepository.GetDailyTable(IdKhuNha, IdLoaiPhong, date.Value);

            return Ok(new
            {
                data
            });
        }
    }
}
