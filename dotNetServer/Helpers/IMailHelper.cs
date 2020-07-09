using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotNetServer.Helpers
{
    public interface IMailHelper
    {
        bool SendMail(string toEmail, string subject, string content);
    }
}
