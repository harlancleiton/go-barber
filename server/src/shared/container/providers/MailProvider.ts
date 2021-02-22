import { IUser } from '~/modules/users/domain';

export interface Address {
  name: string;
  address: string;
}
export interface AttachmentLikeObject {
  path: string;
}
export interface SendMailOptions {
  to?: string | Address | Array<string | Address>;
  from?: string | Address;
  subject?: string;
  text?: string | Buffer | AttachmentLikeObject;
  html?: string | Buffer;
  sender?: string | Address;
  raw?: string | Buffer;
  context?: {
    [name: string]: any;
  };
  template?: string;
  attachments?: {
    filename: string;
    content?: any;
    path?: string;
    contentType?: string;
    cid?: string;
  }[];
}

export interface MailProvider {
  sendMail(user: IUser, options: SendMailOptions): Promise<any>;
}
