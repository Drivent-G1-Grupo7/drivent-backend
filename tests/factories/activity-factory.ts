import faker from '@faker-js/faker';
import { Activity } from '@prisma/client';
import { prisma } from '@/config';

type CreateParams = Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>;

export async function createActivity() {
  return await prisma.activity.create({
    data: {
      name: faker.name.findName(),
      date: '25/06',
      startTime: '09:00',
      endTime: '12:00',
      location: 'Auditorio Principal',
      eventId: 1,
      totalSpots: 100,
    },
  });
}

export function getActivityReturn() {
  const activity: Activity = {
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
  };
  return activity;
}
