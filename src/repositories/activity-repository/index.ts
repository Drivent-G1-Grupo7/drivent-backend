import { prisma } from '@/config';

async function findById(activityId: number) {
  return prisma.activity.findFirst({
    where: {
      id: activityId
    }
  });
}

async function findActivitiesByEventId(eventId: number) {
  return prisma.activity.findFirst({
    where: {
      eventId,
    }
  })
}

async function findAllActivitiesByEventId(eventId: number) {
  return prisma.activity.findMany({
    where: {
      eventId,
    }
  });
}

const activityRepository = {
  findById,
  findActivitiesByEventId,
  findAllActivitiesByEventId,
};

export default activityRepository;
