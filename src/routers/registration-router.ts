import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { changeRegistration, listActivities, registerActivity } from '@/controllers/registration-controller';

const registrationRouter = Router();

registrationRouter
    .all('/*', authenticateToken)
    .get('', listActivities)
    .post('', registerActivity)
    .put('/:registrationId', changeRegistration);

export { registrationRouter };