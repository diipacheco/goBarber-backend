import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import showProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfile = container.resolve(showProfileService);

    const user = await showProfile.execute(id);

    // @ts-expect-error
    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id: id,
      name,
      email,
      old_password,
      password,
    });

    // @ts-expect-error
    delete user.password;

    return response.json(user);
  }
}

export default ProfileController;
