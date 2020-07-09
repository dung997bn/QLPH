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
    public class KhuNhaRepository : IKhuNhaRepository
    {
        IDbConnectionFactory _dbConnection;

        public KhuNhaRepository(IDbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public IEnumerable<KhuNha> GetAll()
        {
            using (var conn = _dbConnection.CreateConnection())
            {
                var res = conn.Query<KhuNha>(@"Select * from khu_nha").AsEnumerable();
                return res;
            }
        }
    }
}
