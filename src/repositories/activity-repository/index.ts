import { prisma } from '@/config';

async function findAllActivities() {
  return prisma.activity.findMany();
}

async function findActivitiesByEventId(EventId: number) {
  return prisma.activity.findFirst({
    where: {
      id: EventId,
    }
  });
}

const activityRepository = {
  findAllActivities,
  findActivitiesByEventId,
};

export default activityRepository;
