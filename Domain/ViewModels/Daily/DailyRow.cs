using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.ViewModels.Daily
{
    public class DailyRow
    {
        public List<DailySlotColumn> slot_columns { get; set; }
        public List<TimeHeader> time_headers { get; set; }
    }
}
