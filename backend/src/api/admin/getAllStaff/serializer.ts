import { User } from '../../../entities/user.entity';

interface SerializedAllStaff {
  allStaff: User[];
}

export const serializer = (users: User[]): SerializedAllStaff => {
  return { allStaff: users };
};
