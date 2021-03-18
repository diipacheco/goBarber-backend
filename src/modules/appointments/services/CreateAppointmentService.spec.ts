import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment with success', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123123213',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123213');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 3, 17, 5);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123123123213',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123123123213',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
