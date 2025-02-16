import { User, UserEntityInterface } from "../../../entities/user.entity";

export const serializer = (user: UserEntityInterface): User => {
  return { ...user};
};
