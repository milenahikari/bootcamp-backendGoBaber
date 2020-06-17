import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) { }

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const user = await this.userRepository.findAllProviders({
      exception_user_id: user_id,
    });

    return user;
  }
}

export default ListProvidersService;