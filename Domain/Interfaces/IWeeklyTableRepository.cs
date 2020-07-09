using Domain.ViewModels.Weekly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IWeeklyTableRepository
    {
        IEnumerable<WeeklyTableHeader> GetListDayOfWeek(DateTime date);
        WeeklyTable GetWeeklyTable(int IdKhuNha, int IdLoaiPhong, DateTime today);
    }
}
