import supertest from 'supertest';
import { cleanDb } from '../helpers';
import { createActivity } from '../factories/activity-factory';
import { createUser } from '../factories/users-factory';
import { createRegistration } from '../factories/registration-factory';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /registration', () => {
  test('should return 201 when creating a new registration', async () => {
    const activity = await createActivity();
    const user = await createUser();
    const response = await server.post('/registration').send({
      activityId: activity.id,
      userId: user.id,
    });
    expect(response.status).toBe(201);
  });
  test('should return 400 when creating a new registration with invalid data', async () => {
    const activity = await createActivity();
    const user = await createUser();
    const response = await server.post('/registration').send({
      activityId: activity.id,
      userId: user.id,
    });
    expect(response.status).toBe(400);
  });
  test('should return 409 when creating a new registration with invalid data', async () => {
    const activity = await createActivity();
    const user = await createUser();
    const response = await server.post('/registration').send({
      activityId: activity.id,
      userId: user.id,
    });
    expect(response.status).toBe(409);
  });
});

describe('GET /registration/:id', () => {
  test('should return 200 when getting a registration', async () => {
    const registration = await createRegistration({
      activityId: 1,
      userId: 1,
    });

    const response = await server.get(`/registration/${registration.id}`);
    expect(response.status).toBe(200);
  });
  test('should return 404 when getting a registration that does not exist', async () => {
    const response = await server.get(`/registration/1`);
    expect(response.status).toBe(404);
  });
});
