using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Domain
{
    public class DbConnectionFactory : IDbConnectionFactory
    {
        string _connStr = "Host=ec2-18-235-109-97.compute-1.amazonaws.com;Port=5432;Username=lmolbcywmgktzz;Password=8b262536e744c60c35fb58689b9b4643a3fbe19e5e33e2546b836c0c75eda014;Database=d87q5pr8er9nds; TrustServerCertificate = True;  sslmode=Require";
        public IDbConnection CreateConnection()
        {
            var conn = new NpgsqlConnection(_connStr);
            conn.Open();
            return conn;
        }
    }
}
