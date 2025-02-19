import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity, UserEntityInterface } from './user.entity';

export enum Energy {
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
  HYBRID = 'hybrid',
  ELECTRIC = 'electric',
  UNKNOWN = 'unknown',
}

export interface Car {
  id: string;
  plateNumber: string;
  registrationDate: Date;
  color: string;
  brand: string;
  model: string;
  seats: number;
  energy: Energy;
}

export interface CarEntityInterface extends Car {
  owner: UserEntityInterface;
}

@Entity('car')
export class CarEntity implements CarEntityInterface {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  @Index({ unique: true })
  plateNumber: string;

  @Column({ type: 'date' })
  registrationDate: Date;

  @Column()
  color: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  seats: number;

  @Column({ type: 'enum', enum: Energy, default: Energy.UNKNOWN })
  energy: Energy;

  @ManyToOne(() => UserEntity, (user) => user.cars, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: UserEntity;
}
