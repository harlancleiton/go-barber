export interface ParseMailTemplateOptions {
  pathTemplate: string;
  context?: { [key: string]: any };
}

export interface MailTemplateProvider {
  parse(options: ParseMailTemplateOptions): Promise<string>;
}
