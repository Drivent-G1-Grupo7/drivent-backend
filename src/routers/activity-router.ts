import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getEventActivities } from '@/controllers/activity-controller';

const activityRouter = Router();

activityRouter
    .all('/*', authenticateToken)
    .get('/', getEventActivities);

export { activityRouter };