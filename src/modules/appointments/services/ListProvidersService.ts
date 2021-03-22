import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IListProvidersDTO from '../dtos/IListProvidersDTO';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ except_user_id }: IListProvidersDTO): Promise<User[]> {
    const users = this.usersRepository.findAllProviders({
      except_user_id,
    });

    return users;
  }
}

export default ListProvidersService;
