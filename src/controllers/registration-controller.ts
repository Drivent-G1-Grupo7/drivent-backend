import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import registrationService from '@/services/registration-service';

export async function listActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const registration = await registrationService.getRegistration(userId);
    return res.status(httpStatus.OK).send({
      id: registration.id,
      Activity: registration.Activity,
    });
  } catch (error) {
    next(error);
  }
}

export async function registerActivity(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { activityId } = req.body as Record<string, number>;

    const registration = await registrationService.registerActivityById(userId, activityId);

    return res.status(httpStatus.OK).send({
      registrationId: registration.id,
    });
  } catch (error) {
    next(error);
  }
}

export async function changeRegistration(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const registrationId = Number(req.params.registrationId);
  if (!registrationId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const { activityId } = req.body as Record<string, number>;
    const registration = await registrationService.changeRegisteredActivityById(userId, activityId);

    return res.status(httpStatus.OK).send({
      registrationId: registration.id,
    });
  } catch (error) {
    next(error);
  }
}
