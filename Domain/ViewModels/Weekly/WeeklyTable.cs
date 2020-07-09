using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels.Weekly
{
    public class WeeklyTable
    {
        public List<WeeklyRow> rows { set; get; }
        public string to_day { set; get; }
    }
}
