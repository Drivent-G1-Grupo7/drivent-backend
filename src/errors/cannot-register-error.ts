import { ApplicationError } from '@/protocols';

export function cannotRegisterError(): ApplicationError {
  return {
    name: 'CannotRegisterError',
    message: 'Cannot register in this activity! No spots left!',
  };
}
