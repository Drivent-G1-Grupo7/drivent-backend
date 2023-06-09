import activityRepository from '@/repositories/activity-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import { cannotListActivitiesError } from '@/errors/cannot-list-activities-error';
import eventRepository from '@/repositories/event-repository';

async function checkActivities(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListActivitiesError();
  }
}

async function listEventActivities(userId: number) {
  await checkActivities(userId);


  const event = await eventRepository.findFirst();
  const eventId = event.id;


  const activities = await activityRepository.findAllActivities();
  if (!activities || activities.length === 0) {
    throw notFoundError();
  }
  return activities;
}

export default {
  checkActivities,
  listEventActivities,
};
