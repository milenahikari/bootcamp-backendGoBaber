import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserServices';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.send(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

userRouter.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);
export default userRouter;
