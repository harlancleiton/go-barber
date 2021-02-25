import fs from 'fs';
import handlebars from 'handlebars';

import {
  MailTemplateProvider,
  ParseMailTemplateOptions
} from '../MailTemplateProvider';

export class HandlebarsMailTemplateProvider implements MailTemplateProvider {
  async parse(options: ParseMailTemplateOptions): Promise<string> {
    const templateContent = await fs.promises.readFile(options.pathTemplate, {
      encoding: 'utf-8'
    });

    const parseTemplate = handlebars.compile(templateContent);

    return parseTemplate(options.context);
  }
}
