using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IQLPHReporitory
    {
        IEnumerable<LichDangKy> GetAll();
        LichDangKy GetById(int Id);
        LichDangKy Insert(LichDangKy model);
        IEnumerable<LichDangKy> GetByDate(DateTime date);
        IEnumerable<LichDangKy> GetByTime(DateTime batDau, DateTime ketThuc);
    }
}
