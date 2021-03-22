import IListProvidersDTO from '@modules/appointments/dtos/IListProvidersDTO';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

import User from '../infra/typeorm/entities/User';

interface IUsersRepository {
  findAllProviders(data?: IListProvidersDTO): Promise<User[]>;
  create(data: ICreateUsersDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

export default IUsersRepository;
