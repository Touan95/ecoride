export const DEFAULT_AVATAR_URL = 'https://ecoride-sooty.vercel.app/assets/avatars/avatar_0-circle.png';

export enum UserType {
  DRIVER = 'driver',
  PASSENGER = 'passenger',
  BOTH = 'both'
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string | null;
  type: UserType;
  acceptsSmoking: boolean;
  acceptsPets: boolean;
  isStaff: boolean;
  isAdmin: boolean;
  isBlocked: boolean;
  customRules: string[];
  credits: number;
  rate: number | null;
}

export type UserLight = Pick<User, 'id' | 'avatarUrl' | 'username' | 'rate'>;

export type LoggedUser = Pick<User, 'id' | 'type' | 'username' | 'email' | 'isAdmin' | 'isStaff' | 'isBlocked'>;
