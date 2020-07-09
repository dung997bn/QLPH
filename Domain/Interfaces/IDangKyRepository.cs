using Domain.Entity;
using Domain.ViewModels.Daily;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IDangKyRepository
    {
        List<TimeItem> ListTimeDangky(TimeSpan start, TimeSpan EndOfDay, TimeSpan SlotMin);
        LichDangKy AddNew(LichDangKy dangKy);
        LichDangKy GetById(int Id);
    }
}
