import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import activityService from '@/services/activity-service';

export async function getEventActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;

    try {
        const activities = await activityService.listEventActivities(userId)
        return res.status(httpStatus.OK).send(activities);
    } catch (error) {
        next(error);
    }
}
