using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.ViewModels.Daily
{
    public class DailySlotColumn
    {
        public string ngay_hien_tai { set; get; }
        public int id_dangky { set; get; }
        public bool is_room { set; get; }
        public bool is_dangky { set; get; }
        public string ghi_chu { set; get; }
        public string bat_dau { get; set; }
        public string ket_thuc { get; set; }
        public int thoi_gian_dang_ky { set; get; }
        public string tinh_trang { set; get; }
        public string noi_dung { set; get; }
        public string day_of_week { get; set; }
        public virtual LanhDao lanh_dao { set; get; }
        public virtual Phong phong { set; get; }
    }
}
