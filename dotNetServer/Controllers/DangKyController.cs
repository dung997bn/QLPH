using Domain.Entity;
using Domain.Interfaces;
using dotNetServer.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Globalization;
using System.IO;

namespace dotNetServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DangKyController : ControllerBase
    {
        private IDangKyRepository _dangKyRepository;
        private IPhongRepository _phongRepository;
        private ILanhDaoRepository _lanhDaoRepository;
        private readonly ApplicationSettings _appSettings;
        private IMailHelper _mailHelper;
        public DangKyController(IDangKyRepository dangKyRepository, IOptions<ApplicationSettings> appSettings,
            IMailHelper mailHelper, IPhongRepository phongRepository, ILanhDaoRepository lanhDaoRepository)
        {
            _dangKyRepository = dangKyRepository;
            _appSettings = appSettings.Value;
            _phongRepository = phongRepository;
            _lanhDaoRepository = lanhDaoRepository;
            _mailHelper = mailHelper;
        }

        [HttpGet]
        [Route("getlisttime")]
        public IActionResult GetListTimeDangKy(string startTime)
        {
            var startOfDay = String.IsNullOrEmpty(startTime) ? TimeSpan.ParseExact(_appSettings.STARTOFDAY, @"hh\:mm", CultureInfo.CurrentCulture)
                : TimeSpan.ParseExact(startTime, @"hh\:mm", CultureInfo.CurrentCulture);
            var endOfDay = TimeSpan.ParseExact(_appSettings.ENDOFDAY, @"hh\:mm", CultureInfo.CurrentCulture);
            var slotMin = TimeSpan.FromMinutes(int.Parse(_appSettings.SLOTDURATIONMINS));


            var data = _dangKyRepository.ListTimeDangky(startOfDay, endOfDay, slotMin);

            return Ok(new
            {
                data
            });
        }

        [HttpPost]
        [Route("postForm")]
        public IActionResult DangKy([FromBody] LichDangKy model)
        {
            if (DateTime.Parse(model.ngay_dang_ky).Date <= DateTime.Now.Date)
            {
                return BadRequest(new { error = "Ngày đăng ký không hợp lệ" });
            }
            if (String.IsNullOrEmpty(model.email) || String.IsNullOrEmpty(model.ten_nguoi_dang_ky)
                || String.IsNullOrEmpty(model.id_lanhdao.ToString()) || String.IsNullOrEmpty(model.id_phong.ToString())
                || String.IsNullOrEmpty(model.bat_dau) || String.IsNullOrEmpty(model.ket_thuc) || String.IsNullOrEmpty(model.ngay_dang_ky)
                || String.IsNullOrEmpty(model.thanh_phan) || String.IsNullOrEmpty(model.ghi_chu) || String.IsNullOrEmpty(model.noi_dung))
            {
                return BadRequest(new { error = "Vui lòng điền đầy đủ thông tin" });
            }
            var entity = new LichDangKy
            {
                email = model.email,
                ten_nguoi_dang_ky = model.ten_nguoi_dang_ky,
                id_phong = model.id_phong,
                id_lanhdao = model.id_lanhdao,
                bat_dau = model.bat_dau,
                ket_thuc = model.ket_thuc,
                ngay_dang_ky = model.ngay_dang_ky,
                thanh_phan = model.thanh_phan,
                ghi_chu = model.ghi_chu,
                sdt = model.sdt,
                noi_dung = model.noi_dung,
                tinh_trang = "Đang chờ xử lý"
            };
            var res = _dangKyRepository.AddNew(entity);
            if (res == null)
            {
                return BadRequest(new { error = "Thêm mới không thành công. Vui lòng đăng ký lại" });
            }
            //Send mail
            var lanh_dao = _lanhDaoRepository.GetById(res.id_lanhdao);
            var phong = _phongRepository.GetById(res.id_phong);

            var file = Path.Combine(Directory.GetCurrentDirectory(), "Assets", "MailTemplate", "XacNhanDaDangKy.html");
            string contentToUser = System.IO.File.ReadAllText(file);

            contentToUser = contentToUser.Replace("{{Name}}", res.ten_nguoi_dang_ky);
            contentToUser = contentToUser.Replace("{{Email}}", res.email);
            contentToUser = contentToUser.Replace("{{Room}}", phong.ten_phong);
            contentToUser = contentToUser.Replace("{{ThoiGian}}", res.bat_dau + "-" + res.ket_thuc);
            contentToUser = contentToUser.Replace("{{NgayDangKy}}", res.ngay_dang_ky);
            contentToUser = contentToUser.Replace("{{TinhTrang}}", res.tinh_trang);
            //Extra
            contentToUser = contentToUser.Replace("{{NoiDungCuocHop}}", res.noi_dung);
            contentToUser = contentToUser.Replace("{{GhiChu}}", res.ghi_chu);
            contentToUser = contentToUser.Replace("{{ThanhPhan}}", res.thanh_phan);
            contentToUser = contentToUser.Replace("{{TinhTrang}}", res.tinh_trang);
            contentToUser = contentToUser.Replace("{{DonViCongTac}}", lanh_dao.don_vi_cong_tac);
            _mailHelper.SendMail(model.email, "NEU", contentToUser);

            return Ok(new
            {
                entity,
                msg = "thêm mới thành công"
            });

        }
    }
}
