using Dapper;
using Domain;
using Domain.Entity;
using Domain.Interfaces;
using Domain.ViewModels.Daily;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure.Imp
{
    public class DangKyRepository : IDangKyRepository
    {
        IDbConnectionFactory _dbConnection;

        public DangKyRepository(IDbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public LichDangKy AddNew(LichDangKy dangKy)
        {
            if (String.IsNullOrEmpty(dangKy.noi_dung))
                return null;
            var sql = @"INSERT INTO public.lich_dang_ky(id_phong, id_lanhdao, bat_dau, ket_thuc, ngay_dang_ky, ten_nguoi_dang_ky, email,
                                                 sdt, tinh_trang, thanh_phan, noi_dung, ghi_chu)
	                    VALUES (@id_phong, @id_lanhdao, @bat_dau, @ket_thuc, @ngay_dang_ky, @ten_nguoi_dang_ky, @email,
                                                 @sdt, @tinh_trang, @thanh_phan, @noi_dung, @ghi_chu)";
            using (var conn = _dbConnection.CreateConnection())
            {
                var res = conn.Execute(sql, new {
                    id_phong=dangKy.id_phong,
                    id_lanhdao = dangKy.id_lanhdao,
                    bat_dau = dangKy.bat_dau,
                    ket_thuc = dangKy.ket_thuc,
                    ngay_dang_ky = dangKy.ngay_dang_ky,
                    ten_nguoi_dang_ky = dangKy.ten_nguoi_dang_ky,
                    email = dangKy.email,
                    sdt = dangKy.sdt,
                    tinh_trang = dangKy.tinh_trang,
                    thanh_phan = dangKy.thanh_phan,
                    noi_dung = dangKy.noi_dung,
                    ghi_chu = dangKy.ghi_chu
                });
                if (res > 0)
                    return
                        dangKy;
                else
                    return null;
            }
        }

        public LichDangKy GetById(int Id)
        {
            var sql = @"Select * from lich_dang_ky  a 
                                     inner join phong b on a.id_phong=b.id
                                     inner join lanh_dao c on a.id_lanhdao=c.id
                                     where a.id=@id";
            using (var conn = _dbConnection.CreateConnection())
            {
                var res = conn.Query<LichDangKy, Phong, LanhDao, LichDangKy>
                    (sql, (l, p, ld) =>
                    {
                        l.lanh_dao = ld;
                        l.phong = p;
                        return l;
                    }, new { id = Id }, splitOn: "id, id").SingleOrDefault();
                return res;
            }
        }

        public List<TimeItem> ListTimeDangky(TimeSpan start, TimeSpan EndOfDay, TimeSpan SlotMin)
        {
            var listTime = new List<TimeItem>();
            //var thoiGianKetThucDangKy = TimeSpan.ParseExact(ConfigurationManager.AppSettings["EndOfDay"], @"hh\:mm", CultureInfo.CurrentCulture);
            //var slotMins = TimeSpan.FromMinutes(int.Parse(ConfigurationManager.AppSettings["SlotDurationMins"]));

            for (TimeSpan i = start.Add(SlotMin); i <= EndOfDay; i = i.Add(SlotMin))
            {
                var isSelected = (start.Hours.Equals(i.Hours) && (start.Minutes.Equals(i.Minutes)));

                listTime.Add(new TimeItem
                {
                    text = i.ToString(@"hh\:mm"),
                    value = (((double)(i.Hours) + ((double)(i.Minutes) / 60)).ToString()),
                    selected_value = isSelected
                });
            }

            return listTime;
        }
    }
}
