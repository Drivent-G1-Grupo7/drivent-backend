import faker from '@faker-js/faker';
import { Activity, Registration } from '@prisma/client';
import { prisma } from '@/config';

type CreateParams = Omit<Registration, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateParams = Omit<Registration, 'createdAt' | 'updatedAt'>;

export function createRegistration({ activityId, userId }: CreateParams) {
  return prisma.registration.create({
    data: {
      activityId,
      userId,
    },
  });
}

export function getRegistrationReturn() {
  const registration: Registration & { Activity: Activity } = {
    id: 1,
    activityId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    Activity: {
      id: 1,
      name: faker.name.findName(),
      date: '25/06',
      startTime: '09:00',
      endTime: '12:00',
      location: 'Auditorio Principal',
      eventId: 1,
      totalSpots: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  return registration;
}
