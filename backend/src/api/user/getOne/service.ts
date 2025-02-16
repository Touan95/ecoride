import { UserEntityInterface } from "../../../entities/user.entity";
import { UserRepositoryInterface } from "../../../repositories/user.repository";
import userNotFoundError from "../../common/errors/userNotFound.error";

export interface GetOneUserServiceOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  userId,
  userRepository
}: GetOneUserServiceOptions): Promise<UserEntityInterface> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  return user;
};
