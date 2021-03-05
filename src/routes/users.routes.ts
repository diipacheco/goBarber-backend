import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  // @ts-expect-error
  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const { id } = request.user;

    const { filename } = request.file;

    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      user_id: id,
      avatarFileName: filename,
    });

    // @ts-expect-error
    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
