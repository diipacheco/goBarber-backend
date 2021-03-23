import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { filename } = request.file;

    const updateAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateAvatar.execute({
      user_id: id,
      avatarFileName: filename,
    });

    return response.json({ user: classToClass(user) });
  }
}

export default UsersAvatarController;
