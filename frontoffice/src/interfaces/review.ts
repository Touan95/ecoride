export interface Review {
  reviewer: string;
  rating: number;
  date: Date;
  comment: string;
}

export const reviewMock: Review = {
  reviewer: 'Jane',
  rating: 4,
  date: new Date(),
  comment:
    'John est un excellent chauffeur ! Ponctuel, courtois et très professionnel, il met un point d’honneur à assurer un trajet agréable. Son véhicule est propre et confortable, et il conduit de manière fluide et sécurisée. Je recommande vivement !'
};
