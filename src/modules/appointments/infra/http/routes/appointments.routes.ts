import { Router } from 'express';
import { parseISO } from 'date-fns'; // startOfHour usa as horas inteiras, e parseISO permite trabalhar com o Date()
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentRepository = new CreateAppointmentService();

  const appointment = await createAppointmentRepository.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentRouter;
