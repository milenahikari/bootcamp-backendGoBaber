import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonth = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await listProviderMonth.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}