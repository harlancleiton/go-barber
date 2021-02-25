import { IUser } from '~/modules/users/domain';

import { MailProvider, SendMailOptions } from '../MailProvider';

export class FakeMailProvider implements MailProvider {
  private messages: SendMailOptions[] = [];

  async sendMail(user: IUser, options: SendMailOptions): Promise<any> {
    const message = { to: user.email, ...options };
    this.messages.push(message);

    return message;
  }
}
