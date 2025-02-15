export interface Car {
  brand: string;
  model: string;
  energy: string;
  seats: number;
  green?: boolean;
}

export const carMock: Car = {
  seats: 3,
  brand: 'Volkswagen',
  model: 'Jetta',
  energy: 'Diesel',
  green: true
};
