using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class LanhDao
    {
        public int id { set; get; }
        public string ho_ten { set; get; }
        public string chuc_vu { set; get; }
        public string email { set; get; }
        public string sdt { get; set; }
        public string don_vi_cong_tac { set; get; }
    }
}
