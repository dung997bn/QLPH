using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels.Weekly
{
    public class WeeklyTableHeader
    {
        public string week_day { get; set; }
        public string day_of_week { get; set; }
        public string day_string { get; set; }
        public DateTime day_date { get; set; }
    }
}
