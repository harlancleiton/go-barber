import { factories } from '~/shared/factories';

import { MailTemplateProvider } from '../MailTemplateProvider';

export class FakeMailProvider implements MailTemplateProvider {
  async parse(): Promise<string> {
    return factories.faker.lorem.paragraph();
  }
}
