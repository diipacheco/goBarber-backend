import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatar from '@modules/users/services/UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRespository';

let fakeUsersRepository: FakeUsersRepository;
let createFakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatar;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createFakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatar(
      fakeUsersRepository,
      createFakeStorageProvider,
    );
  });
  it('should be able to update avatar with success', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'not-existing-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(createFakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
