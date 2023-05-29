import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import {
  createEnrollmentWithAddress,
  createUser,
  createTicket,
  createPayment,
  createTicketTypeWithHotel,
  createHotel,
  createRoomWithHotelId,
} from '../factories';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /activity', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activity');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activity').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activity').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 when user ticket is remote ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);
      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const response = await server.get('/activity').set('Authorization', `Bearer ${token}`).send({
        hotelId: hotel.id,
        roomId: room.id,
        checkIn: faker.date.future(),
        checkOut: faker.date.future(),
      });

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 when user ticket is not remote ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);
      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const response = await server.get('/activity').set('Authorization', `Bearer ${token}`).send({
        hotelId: hotel.id,
        roomId: room.id,
        checkIn: faker.date.future(),
        checkOut: faker.date.future(),
      });

      expect(response.status).toBe(httpStatus.OK);
    });

    it('should respond with status 200 when user ticket is remote and hotelId is not given ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);
      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const response = await server.get('/activity').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
        checkIn: faker.date.future(),
        checkOut: faker.date.future(),
      });

      expect(response.status).toBe(httpStatus.OK);
    });

    it('should respond with status 200 when user ticket is remote and roomId is not given ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);
      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const response = await server.get('/activity').set('Authorization', `Bearer ${token}`).send({
        hotelId: hotel.id,
        checkIn: faker.date.future(),
        checkOut: faker.date.future(),
      });

      expect(response.status).toBe(httpStatus.OK);
    });

    it('should respond with status 200 and a list of activities', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);
      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const response = await server.get('/activity').set('Authorization', `Bearer ${token}`).send({
        hotelId: hotel.id,
        roomId: room.id,
        checkIn: faker.date.future(),
        checkOut: faker.date.future(),
      });

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toHaveProperty('activities');
    });
  });
});
