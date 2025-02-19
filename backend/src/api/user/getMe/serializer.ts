import { User, UserEntityInterface } from '../../../entities/user.entity';

export type LoggedUser = Pick<User, 'id' | 'type' | 'username' | 'email'>;

export const serializeMe = (user: UserEntityInterface): LoggedUser => ({
  id: user.id,
  email: user.email,
  type: user.type,
  username: user.username,
});

export default (user: UserEntityInterface): LoggedUser => ({
  ...serializeMe(user),
});
