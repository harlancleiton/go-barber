import nodemailer from 'nodemailer';

import { IUser } from '~/modules/users/domain';

import { MailProvider, SendMailOptions } from '../MailProvider';

export class EtherealMailProvider implements MailProvider {
  private client: nodemailer.Transporter;

  constructor() {
    this.createAccount().then(account => {
      this.createTransport(account);
    });
  }

  private async createAccount(): Promise<nodemailer.TestAccount> {
    return await nodemailer.createTestAccount();
  }

  private createTransport(account: nodemailer.TestAccount): void {
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });

    this.client = transporter;
  }

  async sendMail(user: IUser, options: SendMailOptions): Promise<any> {
    const to = `${user.fullname} <${user.email}>`;

    const message = await this.client.sendMail({ to, ...options });

    // TODO add Logger
    // eslint-disable-next-line no-console
    console.log('Preview URL: ', nodemailer.getTestMessageUrl(message));

    return message;
  }
}
