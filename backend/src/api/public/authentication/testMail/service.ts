import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import { emailSender } from '../../../../services/emailSender';

export interface RegisterServiceOptions {
  email: string;
  password: string;
  username: string;
  isStaff: boolean;
  userRepository: UserRepositoryInterface;
}

export interface RegisterServiceResponse {
  accessToken: string;
  refreshToken: string;
}

export default async (): Promise<void> => {
  void emailSender.rideCancelledByDriver({
    arrivalCity: '',
    departureCity: '',
    departureDate: '',
    email: 'anthony.hoang@snowpact.com',
    username: 'test',
  });
};
