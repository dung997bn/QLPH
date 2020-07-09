using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace dotNetServer.Helpers
{
    public class MailHelper: IMailHelper
    {
        private readonly ApplicationSettings _appSettings;

        public MailHelper(IOptions<ApplicationSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }
        public bool SendMail(string toEmail, string subject, string content)
        {
            try
            {
                var FromEmail = _appSettings.ADMINEMAIL;
                var host = _appSettings.SMTPHOST;
                var port = int.Parse(_appSettings.SMTPPORT);
                var fromEmail = _appSettings.ADMINEMAIL;
                var password = _appSettings.PASSWORD;
                var fromName = _appSettings.FROMNAME;

                var smtpClient = new SmtpClient(host, port)
                {
                    UseDefaultCredentials = false,
                    Credentials = new System.Net.NetworkCredential(fromEmail, password),
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    EnableSsl = true,
                    Timeout = 100000
                };

                var mail = new MailMessage
                {
                    Body = content,
                    Subject = subject,
                    From = new MailAddress(fromEmail, fromName)
                };

                mail.To.Add(new MailAddress(toEmail));
                mail.BodyEncoding = System.Text.Encoding.UTF8;
                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;

                smtpClient.Send(mail);

                return true;
            }
            catch (SmtpException smex)
            {

                return false;
            }
        }
    }
}
