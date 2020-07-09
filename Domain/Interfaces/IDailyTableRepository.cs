using Domain.ViewModels.Daily;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IDailyTableRepository
    {
        DailyTable GetDailyTable(int IdKhuNha, int IdLoaiPhong, DateTime? ToDay);
    }
}
