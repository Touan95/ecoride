import { v4 as uuid } from 'uuid';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userEmailAlreadyExistsError from '../../../common/errors/userEmailAlreadyExists.error';
import { processTransaction } from '../../../../core/database';
import { hashPassword } from '../common/services/password.service';
import { UserEntityInterface, UserType } from '../../../../entities/user.entity';
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

export default async ({
  email,
  password,
  username,
  isStaff,
  userRepository,
}: RegisterServiceOptions): Promise<UserEntityInterface | undefined> => {
  const user = await userRepository.getOneByEmail(email);
  if (user) {
    throw userEmailAlreadyExistsError();
  }

  let newUser;

  await processTransaction(async (transactionalEntityManager) => {
    const hashedPassword = await hashPassword(password);

    newUser = await userRepository.createOne(
      {
        id: uuid(),
        email,
        password: hashedPassword,
        username,
        acceptsPets: true,
        acceptsSmoking: true,
        avatarUrl: null,
        credits: 20,
        customRules: [],
        type: UserType.PASSENGER,
        rate: null,
        isAdmin: false,
        isBlocked: false,
        isStaff,
      },
      transactionalEntityManager,
    );
  });

  void emailSender.userRegistrationConfirmation({
    email,
    username,
  });

  return newUser;
};
