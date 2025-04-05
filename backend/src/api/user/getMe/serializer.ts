import { User, UserEntityInterface } from '../../../entities/user.entity';

export type LoggedUser = Pick<
  User,
  'id' | 'type' | 'username' | 'email' | 'isAdmin' | 'isStaff' | 'isBlocked'
>;

export const serializeMe = (user: UserEntityInterface): LoggedUser => ({
  id: user.id,
  email: user.email,
  type: user.type,
  username: user.username,
  isAdmin: user.isAdmin,
  isStaff: user.isStaff,
  isBlocked: user.isBlocked,
});

export default (user: UserEntityInterface): LoggedUser => ({
  ...serializeMe(user),
});
