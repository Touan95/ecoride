import { Review, reviewMock } from '@/interfaces/review';

export interface Driver {
  avatar: string;
  username: string;
  rate: number;
  allowPets?: boolean;
  allowSmokers?: boolean;
  customPreferences?: string[];
  reviews: Review[];
}

export const driverMock: Driver = {
  avatar: 'https://cdn.sanity.io/images/87dmpjr7/production/538bf74e8ed2d58ca18713ec29cf52d834230e12-920x1000.png',
  username: 'John',
  rate: 4.3,
  allowPets: true,
  allowSmokers: false,
  customPreferences: ["Je n'accepte pas les grosses valises", 'Pas de nourriture à bord', 'Accepte tous les genre de musique'],
  reviews: [
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock,
    reviewMock
  ]
};
