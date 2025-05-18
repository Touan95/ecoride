import { User, UserEntityInterface } from '../../../entities/user.entity';

export type LoggedUser = Pick<
  User,
  | 'id'
  | 'type'
  | 'username'
  | 'email'
  | 'isAdmin'
  | 'isStaff'
  | 'isBlocked'
  | 'isInvitationPending'
  | 'termsAccepted'
  | 'termsAcceptedAt'
>;

export const serializeMe = (user: UserEntityInterface): LoggedUser => ({
  id: user.id,
  email: user.email,
  type: user.type,
  username: user.username,
  isAdmin: user.isAdmin,
  isStaff: user.isStaff,
  isBlocked: user.isBlocked,
  isInvitationPending: user.isInvitationPending,
  termsAccepted: user.termsAccepted,
  termsAcceptedAt: user.termsAcceptedAt,
});

export default (user: UserEntityInterface): LoggedUser => ({
  ...serializeMe(user),
});
