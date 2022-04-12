using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Domain
{
    public class DbConnectionFactory : IDbConnectionFactory
    {
        string _connStr = "Server=NXDUNG1-SMB;Database=QuanLyDangKyPhongHopNeu;User ID=sa;Password=nxdung1";
        public IDbConnection CreateConnection()
        {
            var conn = new SqlConnection(_connStr);
            conn.Open();
            return conn;
        }
    }
}
