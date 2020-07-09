using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class LichDangKy
    {
        public int id { set; get; }
        public int id_phong { set; get; }
        public int id_lanhdao { set; get; }
        public string bat_dau { set; get; }
        public string ket_thuc { set; get; }
        public string ngay_dang_ky { set; get; }
        public string ten_nguoi_dang_ky { set; get; }
        public string email { set; get; }
        public string sdt { set; get; }
        public string tinh_trang { set; get; }
        public string thanh_phan { set; get; }
        public string noi_dung { set; get; }
        public string ghi_chu { get; set; }
        public virtual LanhDao lanh_dao { set; get; }
        public virtual Phong phong { set; get; }
    }
}
