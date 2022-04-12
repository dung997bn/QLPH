using Domain.Entity;
using Domain.Interfaces;
using Domain.ViewModels.Daily;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace Infrastructure.Imp
{
    public class DailyTableRepository : IDailyTableRepository
    {
        private IPhongRepository _phongRepository;
        private IQLPHReporitory _qlphReporitory;

        public DailyTableRepository(IPhongRepository phongRepository, IQLPHReporitory qlphReporitory)
        {
            _phongRepository = phongRepository;
            _qlphReporitory = qlphReporitory;
        }

        public DailyTable GetDailyTable(int IdKhuNha, int IdLoaiPhong, DateTime? ToDay)
        {
            IEnumerable<Phong> phongs = _phongRepository.GetAll();

            if (IdKhuNha > 0)
            {
                phongs = phongs.Where(x => x.id_khu_nha == IdKhuNha);
            }
            if (IdLoaiPhong > 0)
            {
                phongs = phongs.Where(x => x.id_loai_phong == IdLoaiPhong);
            }
            DailyTable dailyTable = new DailyTable();
            dailyTable.rows = new List<DailyRow>();

            dailyTable.to_day = ToDay.Value.Date.ToString("yyyy-MM-dd"); ;

            int rowIndex = 0;
            var skipEmptySlotIndexes = new List<SlotIndex>();
            if (phongs.Count() > 0)
            {
                foreach (var phong in phongs)
                {
                    DateTime currentTime = ToDay.Value.Date.AddHours(7);
                    DateTime endTime = ToDay.Value.Date.AddHours(22);
                    DailyRow row = new DailyRow();
                    row.slot_columns = new List<DailySlotColumn>();
                    row.time_headers = new List<TimeHeader>();
                    row.slot_columns.Add(new DailySlotColumn
                    {
                        phong = phong,
                        is_room = true
                    });
                    int colIndex = 0;

                    while (currentTime < endTime)
                    {
                        IEnumerable<LichDangKy> dangKyTheoNgay = _qlphReporitory.GetByDate(ToDay.Value);

                        LichDangKy CurrenBooking = dangKyTheoNgay.FirstOrDefault(d => d.id_phong.Equals(phong.id) && d.bat_dau.Equals(currentTime));
                        var t = currentTime.ToShortTimeString();
                        row.time_headers.Add(new TimeHeader
                        {
                            name_hour = currentTime.ToShortTimeString(),
                            hour = currentTime
                        });

                        AddDangKySlot(CurrenBooking, row, skipEmptySlotIndexes, rowIndex, colIndex, currentTime, ToDay.Value.Date, phong);
                        currentTime = currentTime.AddMinutes(30);
                        colIndex++;
                    }

                    dailyTable.rows.Add(row);
                    rowIndex++;
                }
            }
            else
            {
                DateTime currentTime = ToDay.Value.Date.AddHours(7);
                DateTime endTime = ToDay.Value.Date.AddHours(22);
                DailyRow row = new DailyRow();
                row.time_headers = new List<TimeHeader>();
                //row.SlotColumns = new List<DailySlotColumn>();
                while (currentTime < endTime)
                {

                    row.time_headers.Add(new TimeHeader
                    {
                        name_hour = currentTime.ToShortTimeString(),
                        hour = currentTime
                    });
                    currentTime = currentTime.AddMinutes(30);
                    dailyTable.rows.Add(row);
                }
            }
            return dailyTable;
        }

        public void AddDangKySlot(LichDangKy CurrenBooking, DailyRow row, List<SlotIndex> skipEmptySlotIndexes, int rowIndex, int colIndex, DateTime currentTime, DateTime Today, Phong phong)
        {
            if (CurrenBooking != null && CurrenBooking.tinh_trang == "Đã chấp nhận")
            {
                //var timeSpan = TimeSpan.ParseExact(CurrenBooking.ket_thuc.ToShortTimeString(), @"hh\:mm", CultureInfo.CurrentCulture) - TimeSpan.ParseExact(CurrenBooking.bat_dau.ToShortTimeString(), @"hh\:mm", CultureInfo.CurrentCulture);
                var timeSpan = CurrenBooking.ket_thuc - CurrenBooking.bat_dau;
                var BookingTimeSpan = (int)timeSpan.TotalMinutes / 30;

                row.slot_columns.Add(new DailySlotColumn
                {
                    id_dangky = CurrenBooking.id,
                    phong = phong,
                    ngay_hien_tai = Today.ToString("yyyy-MM-dd"),
                    is_dangky = true,
                    is_room = false,
                    thoi_gian_dang_ky = BookingTimeSpan,
                    bat_dau = CurrenBooking.bat_dau.ToShortTimeString(),
                    ket_thuc = CurrenBooking.ket_thuc.ToShortTimeString(),
                    ghi_chu = CurrenBooking.ghi_chu,
                    tinh_trang = CurrenBooking.tinh_trang,
                    noi_dung = CurrenBooking.noi_dung

                });
                if (BookingTimeSpan > 1)
                {
                    AddSkipLocation(skipEmptySlotIndexes, BookingTimeSpan, rowIndex, colIndex);
                }
            }
            else if (skipEmptySlotIndexes.IsEmptySlotRequired(colIndex, rowIndex))
            {
                row.slot_columns.Add(new DailySlotColumn
                {
                    ngay_hien_tai = Today.ToString("yyyy-MM-dd"),
                    is_dangky = false,
                    phong = phong,
                    is_room = false,
                    thoi_gian_dang_ky = 1,
                    bat_dau = currentTime.ToShortTimeString(),
                    ket_thuc = currentTime.AddMinutes(30).ToShortTimeString(),
                });
            }
        }

        //Hàm lấy khoảng trống cho lịch đăng ký
        public void AddSkipLocation(ICollection<SlotIndex> skipEmptySlotIndexes, int BookingTimeSpan, int row, int col)
        {
            var emptySlotsToAdd = BookingTimeSpan - 1;
            int i = 1;
            while (i <= emptySlotsToAdd)
            {
                skipEmptySlotIndexes.Add(new SlotIndex(col + i, row));
                i++;
            }
        }
    }
}
