interface MailConfig {
  smtpSender: string;
}

export const mailConfig: MailConfig = {
  // TODO add env
  smtpSender: 'Equipe GoBarber <naoresponder@gobarber.com.br>'
};
