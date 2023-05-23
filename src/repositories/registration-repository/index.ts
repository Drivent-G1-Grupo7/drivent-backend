import { Registration } from '@prisma/client';
import { prisma } from '@/config';

type CreateParams = Omit<Registration, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateParams = Omit<Registration, 'createdAt' | 'updatedAt'>;

async function create({ activityId, userId }: CreateParams): Promise<Registration> {
  return prisma.registration.create({
    data: {
      activityId,
      userId,
    },
  });
}

async function findByActivityId(activityId: number) {
  return prisma.registration.findMany({
    where: {
      activityId,
    },
    include: {
      Activity: true,
    },
  });
}

async function findByUserId(userId: number) {
  return prisma.registration.findFirst({
    where: {
      userId,
    },
    include: {
      Activity: true,
    },
  });
}

async function upsertRegistration({ id, activityId, userId }: UpdateParams) {
  return prisma.registration.upsert({
    where: {
      id,
    },
    create: {
      activityId,
      userId,
    },
    update: {
      activityId,
    },
  });
}

const registrationRepository = {
  create,
  findByActivityId,
  findByUserId,
  upsertRegistration,
};

export default registrationRepository;