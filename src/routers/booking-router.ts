import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { bookingRoom, changeBooking, listBooking, showAllBookings } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('', listBooking)
  .get('/:roomId', showAllBookings)
  .post('', bookingRoom)
  .put('/:bookingId', changeBooking);

export { bookingRouter };
