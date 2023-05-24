import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import { cannotRegisterError } from '@/errors/cannot-register-error';
import activityRepository from '@/repositories/activity-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import registrationRepository from '@/repositories/registration-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function checkEnrollmentTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw cannotRegisterError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotRegisterError();
  }
}

async function checkForValidRegistration(activityId: number) {
  const activity = await activityRepository.findById(activityId);
  const registrations = await registrationRepository.findByActivityId(activityId)

  if (!activity) throw notFoundError();
  if (activity.totalSpots <= registrations.length) throw cannotRegisterError();
}

async function getRegistration(userId: number) {
  const registration = await registrationRepository.findByUserId(userId)
  if (!registration) throw notFoundError();

  return registration;
}

async function registerActivityById(userId: number, activityId: number) {
  if (!activityId) throw badRequestError();

  await checkEnrollmentTicket(userId);
  await checkForValidRegistration(activityId);

  return registrationRepository.create({ activityId, userId });
}

async function changeRegisteredActivityById(userId: number, activityId: number) {
  if (!activityId) throw badRequestError();

  await checkForValidRegistration(activityId);
  const registration = await registrationRepository.findByUserId(userId);

  if (!registration || registration.userId !== userId) throw cannotRegisterError();

  return registrationRepository.upsertRegistration({
    id: registration.id,
    activityId,
    userId,
  });
}

const registrationService = {
  registerActivityById,
  getRegistration,
  changeRegisteredActivityById,
  checkEnrollmentTicket,
  checkForValidRegistration,
};

export default registrationService;