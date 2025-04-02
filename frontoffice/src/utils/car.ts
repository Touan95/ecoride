import { CarLight, Energy } from '@/interfaces/car';

export const isCarGreen = (car: CarLight) => {
  return car.energy === Energy.ELECTRIC;
};
