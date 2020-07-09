using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels.Weekly
{
    public class WeeklyRow
    {
        public List<WeeklySlotColumn> slot_columns { get; set; }
        public List<WeeklyTableHeader> header { get; set; }
    }
}
