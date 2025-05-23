import { Repository } from 'typeorm';
import { AppDataSource } from '../loader/database';
import { Car, CarEntity, CarEntityInterface } from '../entities/car.entity';

export type UpdateCar = Partial<Omit<CarEntity, 'id'>>;

export type CarRepositoryInterface = Repository<CarEntity> & {
  updateCar(id: string, car: UpdateCar): Promise<void>;
  createOne(car: CarEntityInterface): Promise<CarEntityInterface>;
  getOneById(id: string): Promise<Car | null>;
  deleteOne(id: string): Promise<void>;
};

export const CarRepository: CarRepositoryInterface = AppDataSource.getRepository(CarEntity).extend({
  async updateCar(id: string, car: UpdateCar): Promise<void> {
    await this.createQueryBuilder('car').update().set(car).where({ id }).execute();
  },
  async createOne(car: CarEntityInterface): Promise<CarEntityInterface> {
    const newCar = this.create(car);
    await this.save(newCar);
    return newCar;
  },
  getOneById(id: string): Promise<Car | null> {
    const query = this.createQueryBuilder('car')
      .where('car.id = :id', { id })
      .andWhere('car.isDeleted = false');

    const car = query.getOne();

    return car;
  },

  async deleteOne(id: string): Promise<void> {
    await this.createQueryBuilder().update().set({ isDeleted: true }).where({ id }).execute();
  },
});
