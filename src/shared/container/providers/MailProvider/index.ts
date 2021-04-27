import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import AmazonSesMailProvider from './implementations/AmazonSesMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(AmazonSesMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
