using Domain;
using Domain.Entity;
using Domain.Interfaces;
using Domain.ViewModels.Weekly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Imp
{
    public class WeeklyTableRepository : IWeeklyTableRepository
    {
        IDbConnectionFactory _dbConnection;
        private IPhongRepository _phongRepository;
        private IQLPHReporitory _qlphReporitory;

        public WeeklyTableRepository(IDbConnectionFactory dbConnection, IPhongRepository phongRepository, IQLPHReporitory qlphReporitory)
        {
            _dbConnection = dbConnection;
            _phongRepository = phongRepository;
            _qlphReporitory = qlphReporitory;
        }

        public IEnumerable<WeeklyTableHeader> GetListDayOfWeek(DateTime date)
        {
            List<WeeklyTableHeader> listDayofWeek = new List<WeeklyTableHeader>();
            var ToDayIndex = ((int)date.DayOfWeek + 6) % 7;
            var FirstDayOfWeek = date.AddDays(-ToDayIndex);
            for (int i = 0; i < 7; i++)
            {
                var day = FirstDayOfWeek.AddDays(i);
                listDayofWeek.Add(new WeeklyTableHeader
                {
                    week_day = day.ToString("ddddddd"),
                    day_of_week = day.ToString("dd/MM"),
                    day_date = day.Date,
                    day_string = day.ToString()
                });
            }
            return listDayofWeek;
        }


        public WeeklyTable GetWeeklyTable(int IdKhuNha, int IdLoaiPhong, DateTime today)
        {
            IEnumerable<WeeklyTableHeader> listDayofWeek = GetListDayOfWeek(today);
            var phongs = _phongRepository.GetAll();
            if (IdKhuNha > 0)
            {
                phongs = phongs.Where(x => x.id_khu_nha == IdKhuNha);
            }
            if (IdLoaiPhong > 0)
            {
                phongs = phongs.Where(x => x.id_loai_phong == IdLoaiPhong);
            }

            WeeklyTable weeklyTable = new WeeklyTable();
            weeklyTable.to_day = today.ToString("yyyy-MM-dd");
            weeklyTable.rows = new List<WeeklyRow>();

            DateTime startOfWeek = today.Date;
            DateTime endOfWeek = today.Date.AddDays(7).AddSeconds(-1);

            IEnumerable<LichDangKy> ListDangKyTheoTuan = _qlphReporitory.GetByTime(startOfWeek, endOfWeek);
            if (phongs.Count() > 0)
            {
                foreach (var phong in phongs)
                {
                    WeeklyRow row = new WeeklyRow();
                    row.header = new List<WeeklyTableHeader>();
                    row.slot_columns = new List<WeeklySlotColumn>();

                    row.slot_columns.Add(new WeeklySlotColumn()
                    {
                        room_name = phong.ten_phong,
                        is_room = true
                    });
                    foreach (var day in listDayofWeek)
                    {
                        row.header.Add(new WeeklyTableHeader
                        {
                            week_day = day.week_day,
                            day_of_week = day.day_of_week,
                            day_string = day.day_string
                        });
                    }
                    for (var ngayDauTuan = startOfWeek; ngayDauTuan <= endOfWeek; ngayDauTuan = ngayDauTuan.AddDays(1))
                    {
                        var t = ngayDauTuan.ToString("yyyy-MM-dd");
                        var listDangKyTrongNgay = ListDangKyTheoTuan.Where(d => d.ngay_dang_ky.Date == ngayDauTuan.Date
                        && d.id_phong == phong.id).ToList();
                        AddSlotTuan(listDangKyTrongNgay, row, phong, ngayDauTuan);
                    }
                    weeklyTable.rows.Add(row);
                }
            }
            else
            {
                WeeklyRow row = new WeeklyRow();
                row.header = new List<WeeklyTableHeader>();
                foreach (var day in listDayofWeek)
                {
                    row.header.Add(new WeeklyTableHeader
                    {
                        week_day = day.week_day,
                        day_of_week = day.day_of_week,
                        day_string = day.day_string
                    });
                }
                weeklyTable.rows.Add(row);
            }
            return weeklyTable;
        }


        public void AddSlotTuan(IEnumerable<LichDangKy> listDangKyTrongNgay, WeeklyRow row, Phong phong, DateTime ngayHienTai)
        {
            if (listDangKyTrongNgay.Count() > 0)
            {
                row.slot_columns.Add(new WeeklySlotColumn
                {
                    is_day = true,
                    is_room = false,
                    to_day = ngayHienTai.ToString("yyyy-MM-dd"),
                    room_name = phong.ten_phong,
                    id_phong = phong.id,
                    is_dang_ky = true,
                    list_dang_ky_of_day = listDangKyTrongNgay.Select(x => new LichDangKyResult
                    {
                        id = x.id,
                        id_phong = x.id_phong,
                        id_lanhdao = x.id_lanhdao,
                        bat_dau = x.bat_dau.ToShortTimeString(),
                        ket_thuc = x.ket_thuc.ToShortTimeString(),
                        ngay_dang_ky = x.ngay_dang_ky.ToString(),
                        ten_nguoi_dang_ky = x.ten_nguoi_dang_ky,
                        email = x.email,
                        ghi_chu = x.ghi_chu,
                        noi_dung = x.noi_dung,
                        sdt = x.sdt,
                        thanh_phan = x.thanh_phan,
                        tinh_trang = x.tinh_trang,
                        phong = x.phong,
                        lanh_dao = x.lanh_dao
                    })
                });
            }
            else
            {
                row.slot_columns.Add(new WeeklySlotColumn
                {
                    is_day = true,
                    is_room = false,
                    to_day = ngayHienTai.ToString("yyyy-MM-dd"),
                    room_name = phong.ten_phong,
                    id_phong = phong.id,
                    is_dang_ky = false,
                    list_dang_ky_of_day = null
                });
            }
        }
    }
}
