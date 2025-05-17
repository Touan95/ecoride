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
  emailShareAccepted: boolean | null;
  emailShareAcceptedDate: Date | null;
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

  @Column({ type: 'boolean', nullable: true })
  emailShareAccepted: boolean | null;

  @Column({ type: 'timestamp', nullable: true })
  emailShareAcceptedDate: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
