using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotNetServer
{
    public class ApplicationSettings
    {
        public string JWT_SECRET { get; set; }
        public string CLIENT_URL { get; set; }
        public string STARTOFDAY { get; set; }
        public string ENDOFDAY { get; set; }
        public string SLOTDURATIONMINS { get; set; }

        public string SMTPHOST { get; set; }
        public string SMTPPORT { get; set; }
        public string FROMNAME { get; set; }
        public string ADMINEMAIL { get; set; }
        public string PASSWORD { get; set; }
    }
}
