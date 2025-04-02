export const DEFAULT_AVATAR_URL = 'https://cdn.sanity.io/images/87dmpjr7/production/538bf74e8ed2d58ca18713ec29cf52d834230e12-920x1000.png';

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
  customRules: string[];
  credits: number;
  rate: number | null;
}

export type UserLight = Pick<User, 'id' | 'avatarUrl' | 'username' | 'rate'>;

export type LoggedUser = Pick<User, 'id' | 'type' | 'username' | 'email'>;

export const userMock: User = {
  id: '441a00a2-2cc1-4e86-8618-1a74d9e9a134',
  username: 'userName',
  email: 'user.name@gmail.com',
  password: 'pasword',
  avatarUrl: DEFAULT_AVATAR_URL,
  type: UserType.PASSENGER,
  credits: 200,
  acceptsPets: true,
  acceptsSmoking: true,
  rate: null,
  customRules: ["Je n'accepte pas les grosses valises", 'Pas de nourriture à bord', 'Accepte tous les genre de musique']
};
