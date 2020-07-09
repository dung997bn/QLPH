using Dapper;
using Domain;
using Domain.Entity;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Imp
{
    public class QLPHRepository : IQLPHReporitory
    {
        IDbConnectionFactory _dbConnection;

        public QLPHRepository(IDbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public IEnumerable<LichDangKy> GetAll()
        {
            using (var conn = _dbConnection.CreateConnection())
            {
                var res = conn.Query<LichDangKy>(@"Select * from lich_dang_ky").AsEnumerable();
                return res;
            }
        }

        public IEnumerable<LichDangKy> GetByDate(DateTime date)
        {
            var sql = @"Select * from lich_dang_ky  a 
                                     inner join phong b on a.id_phong=b.id
                                     inner join lanh_dao c on a.id_lanhdao=c.id
                                     where a.ngay_dang_ky=@ngay_dang_ky";
            using (var conn = _dbConnection.CreateConnection())
            {
                var res = conn.Query<LichDangKy, Phong, LanhDao, LichDangKy>
                    (sql, (l, p, ld) =>
                    {
                        l.lanh_dao = ld;
                        l.phong = p;
                        return l;
                    }, new { ngay_dang_ky = date.Date }, splitOn: "id, id").AsEnumerable();
                return res;
            }
        }

        public LichDangKy GetById(int Id)
        {
            var sql = @"Select * from lich_dang_ky  a 
                                     inner join phong b on a.id_phong=b.id
                                     inner join lanh_dao c on a.id_lanhdao=c.id
                                     where a.id=@id";
            using (var conn = _dbConnection.CreateConnection())
            {
                var res = conn.Query<LichDangKy, Phong, LanhDao, LichDangKy>
                    (sql, (l, p, ld) =>
                    {
                        l.lanh_dao = ld;
                        l.phong = p;
                        return l;
                    }, new { id = Id }, splitOn: "id, id").SingleOrDefault();
                return res;
            }
        }

        public IEnumerable<LichDangKy> GetByTime(DateTime batDau, DateTime ketThuc)
        {
            var sql = @"Select * from lich_dang_ky  a 
                                     inner join phong b on a.id_phong=b.id
                                     inner join lanh_dao c on a.id_lanhdao=c.id
                                     where a.ngay_dang_ky between @batDau and @KetThuc";
            using (var conn = _dbConnection.CreateConnection())
            {
                var res = conn.Query<LichDangKy, Phong, LanhDao, LichDangKy>
                    (sql, (l, p, ld) =>
                            {
                                l.lanh_dao = ld;
                                l.phong = p;
                                return l;
                            }, new { batDau = batDau.Date, KetThuc = ketThuc.Date }, splitOn: "id, id").AsEnumerable();
                return res;
            }
        }

        public LichDangKy Insert(LichDangKy model)
        {
            throw new NotImplementedException();
        }
    }
}
