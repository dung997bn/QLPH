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
    public class PhongRepository : IPhongRepository
    {
        IDbConnectionFactory _dbConnection;

        public PhongRepository(IDbConnectionFactory dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public IEnumerable<Phong> GetAll()
        {
            using (var conn = _dbConnection.CreateConnection())
            {
                var res = conn.Query<Phong>(@"Select * from phong").AsEnumerable();
                return res;
            }
        }

        public Phong GetById(int Id)
        {
            using (var conn = _dbConnection.CreateConnection())
            {
                var res = conn.Query<Phong>(@"Select * from phong where id=@id", new { id = Id }).SingleOrDefault();
                return res;
            }
        }
    }
}
