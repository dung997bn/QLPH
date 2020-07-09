using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels.Weekly
{
   public class WeeklySlotColumn
    {
        public string to_day { set; get; }
        public string room_name { set; get; }
        public bool is_room { set; get; }
        public bool is_day { set; get; }
        public bool is_dang_ky { set; get; }
        public int id_phong { set; get; }
        public IEnumerable<LichDangKyResult> list_dang_ky_of_day { get; set; }
    }
}
