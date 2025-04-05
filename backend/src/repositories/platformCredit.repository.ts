import { EntityManager, Repository } from 'typeorm';
import { AppDataSource } from '../loader/database';
import { PlatformCredit, PlatformCreditEntity } from '../entities/plateformCredit.entity';

export type PlatformCreditRepositoryInterface = Repository<PlatformCreditEntity> & {
  createOne(platformCredit: PlatformCredit, entityManager?: EntityManager): Promise<PlatformCredit>;
};

export const PlatformCreditRepository: PlatformCreditRepositoryInterface = AppDataSource.getRepository(
  PlatformCreditEntity,
).extend({
  async createOne(platformCredit: PlatformCredit, entityManager?: EntityManager): Promise<PlatformCredit> {
    const manager = entityManager ?? this.manager;
    const newPlatformCredit = this.create(platformCredit);
    await manager.save(newPlatformCredit);
    return newPlatformCredit;
  },
});
