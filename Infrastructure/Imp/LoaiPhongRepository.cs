using Dapper;
using Domain;
using Domain.Entity;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure.Imp
{
    public class LoaiPhongRepository : ILoaiPhongRepository
    {
        IDbConnectionFactory _dbConnection;

        public LoaiPhongRepository(IDbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public IEnumerable<LoaiPhong> GetAll()
        {
            using (var conn = _dbConnection.CreateConnection())
            {
                var res = conn.Query<LoaiPhong>(@"Select * from loai_phong").AsEnumerable();
                return res;
            }
        }
    }
}
