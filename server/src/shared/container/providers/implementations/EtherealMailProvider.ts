import {
  createTestAccount,
  createTransport,
  Transporter,
  TestAccount,
  getTestMessageUrl
} from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import { mailConfig } from '~/config/mail';
import { IUser } from '~/modules/users/domain';

import {
  MailProvider,
  HTMLSendMailOptions,
  TextSendMailOptions
} from '../MailProvider';
import { MailTemplateProvider } from '../MailTemplateProvider';

@injectable()
export class EtherealMailProvider implements MailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private readonly mailTemplateProvider: MailTemplateProvider
  ) {
    this.createAccount().then(account => {
      this.createTransport(account);
    });
  }

  private async createAccount(): Promise<TestAccount> {
    return await createTestAccount();
  }

  private createTransport(account: TestAccount): void {
    const transporter = createTransport({
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

  async sendMail(
    user: IUser,
    options: TextSendMailOptions | HTMLSendMailOptions
  ): Promise<any> {
    const to = `${user.fullname} <${user.email}>`;
    const from = mailConfig.smtpSender;

    let html: string | undefined;
    if (options.template)
      html = await this.mailTemplateProvider.parse({
        pathTemplate: options.template,
        context: options.context
      });

    const message = await this.client.sendMail({ to, from, html, ...options });

    // TODO add Logger
    // eslint-disable-next-line no-console
    console.log('Preview URL: ', getTestMessageUrl(message));

    return message;
  }
}
