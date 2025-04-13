import { User } from '../../../entities/user.entity';

interface SerializedBlockedUsers {
  blockedUsers: User[];
}

export const serializer = (users: User[]): SerializedBlockedUsers => {
  return { blockedUsers: users };
};
