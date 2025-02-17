import { Car, Energy } from '@/interfaces/car';

export const isCarGreen = (car: Car) => {
  return car.energy === Energy.ELECTRIC;
};
