import { IUser } from '~/modules/users/domain';

import { MailProvider, SendMailOptions } from '../MailProvider';

export class FakeMailProvider implements MailProvider {
  private messages: SendMailOptions[] = [];

  async sendMail(user: IUser, options: SendMailOptions): Promise<any> {
    this.messages.push({ to: user.email, ...options });

    return options;
  }
}
