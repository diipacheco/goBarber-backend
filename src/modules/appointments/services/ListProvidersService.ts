import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IListProvidersDTO from '../dtos/IListProvidersDTO';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvier')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ except_user_id }: IListProvidersDTO): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${except_user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id,
      });

      await this.cacheProvider.save(`providers-list:${except_user_id}`, users);
    }

    return users;
  }
}

export default ListProvidersService;
