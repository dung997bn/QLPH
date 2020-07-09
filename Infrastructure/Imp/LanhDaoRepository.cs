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
    public class LanhDaoRepository : ILanhDaoRepository
    {
        IDbConnectionFactory _dbConnection;

        public LanhDaoRepository(IDbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public IEnumerable<LanhDao> GetAll()
        {
            using (var conn = _dbConnection.CreateConnection())
            {
                var res = conn.Query<LanhDao>(@"Select * from lanh_dao").AsEnumerable();
                return res;
            }
        }

        public LanhDao GetById(int Id)
        {
            using (var conn = _dbConnection.CreateConnection())
            {
                var res = conn.Query<LanhDao>(@"Select * from lanh_dao where id=@id", new { id = Id }).SingleOrDefault();
                return res;
            }
        }
    }
}
