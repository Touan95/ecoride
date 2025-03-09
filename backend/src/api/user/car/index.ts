import { Router } from 'express';
import { addCar } from './addCar';
import { putCar } from './putCar';
import { deleteCar } from './deleteCar';

export const userCarRouter = Router()
  .use(addCar)
  .use(putCar)
  .use(deleteCar);
