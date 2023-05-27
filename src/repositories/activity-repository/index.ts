import { prisma } from '@/config';
import { Activity } from '@prisma/client';

async function findById(activityId: number): Promise<Activity> {
  return prisma.activity.findFirst({
    where: {
      id: activityId,
    },
  });
}

async function findActivitiesByEventId(eventId: number) {
  return prisma.activity.findFirst({
    where: {
      eventId,
    },
  });
}

async function findAllActivitiesByEventId(eventId: number) {
  return prisma.activity.findMany({
    where: {
      eventId,
    },
  });
}

async function findAllActivities() {
  return prisma.activity.findMany();
}

const activityRepository = {
  findById,
  findActivitiesByEventId,
  findAllActivitiesByEventId,
  findAllActivities,
};

export default activityRepository;
