import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UserEntity, UserEntityInterface } from './user.entity';
import { RideEntity, RideEntityInterface } from './ride.entity';

export interface RidePassenger {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  canceled: boolean;
}
export interface RidePassengerEntityInterface extends RidePassenger {
  user: UserEntityInterface;
  ride: RideEntityInterface;
}

@Entity('ride_passenger')
@Index('ride_passenger_user_ride_index', ['user', 'ride'], { unique: true }) // Composite index for uniqueness
export class RidePassengerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => RideEntity, { onDelete: 'CASCADE' })
  ride: RideEntity;

  @Column({ type: 'boolean', default: false })
  canceled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}