using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Phong
    {
        public int id { set; get; }
        public string ten_phong { set; get; }
        public int id_khu_nha { set; get; }
        public int id_loai_phong { set; get; }
    }
}
