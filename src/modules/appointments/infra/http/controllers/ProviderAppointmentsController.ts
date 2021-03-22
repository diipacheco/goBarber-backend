import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listAppointmentService = container.resolve(ListAppointmentsService);

    const appointments = await listAppointmentService.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}

export default ProviderAppointmentsController;
