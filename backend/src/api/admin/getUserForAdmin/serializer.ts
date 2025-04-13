import { User } from '../../../entities/user.entity';

interface SerializedUserForAdmin {
  user: User | null;
}

export const serializer = (user: User | null): SerializedUserForAdmin => {
  return {
    user: user ? { ...user } : null,
  };
};
