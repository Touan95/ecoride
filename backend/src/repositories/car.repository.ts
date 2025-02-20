import { Repository } from 'typeorm';
import { AppDataSource } from '../loader/database';
import { CarEntity, CarEntityInterface } from '../entities/car.entity';

export type UpdateCar = Partial<Omit<CarEntity, 'id'>>;

export type CarRepositoryInterface = Repository<CarEntity> & {
  updateCar(carId: string, car: UpdateCar): Promise<void>;
  createOne(car: CarEntityInterface): Promise<CarEntityInterface>;
};

export const CarRepository: CarRepositoryInterface = AppDataSource.getRepository(CarEntity).extend({
  async updateCar(carId: string, car: UpdateCar): Promise<void> {
    await this.createQueryBuilder('car').update().set(car).where({ id: carId }).execute();
  },
  async createOne(car: CarEntityInterface): Promise<CarEntityInterface> {
    const newCar = this.create(car);
    await this.save(newCar);
    return newCar;
  },
});
