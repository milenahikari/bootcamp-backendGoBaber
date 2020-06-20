import { Request, Response } from 'express';
import { parseISO } from 'date-fns'; // startOfHour usa as horas inteiras, e parseISO permite trabalhar com o Date()
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentRepository = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentRepository.execute({
      date: parsedDate,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }
}
