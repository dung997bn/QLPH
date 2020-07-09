using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.ViewModels.Daily
{
    public class DailyTable
    {
        public List<DailyRow> rows { set; get; }
        public string to_day { set; get; }
    }
}
