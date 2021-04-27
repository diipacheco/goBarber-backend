import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import AmazonS3StorageProvider from './implementations/AmazonS3StorageProvider';

import IStorageProvider from './models/IStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: AmazonS3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
