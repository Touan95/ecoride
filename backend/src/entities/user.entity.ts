import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { CarEntity, CarEntityInterface } from './car.entity';
import { RideHistoryEntity, RideHistoryEntityInterface } from './rideHistory.entity';

export enum UserType {
  DRIVER = 'driver',
  PASSENGER = 'passenger',
  BOTH = 'both',
  APP = 'app',
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string | null;
  type: UserType;
  acceptsSmoking: boolean;
  acceptsPets: boolean;
  customRules: string[];
  credits: number;
  rate: number | null;
}

export type UserLight = Pick<User, 'id' | 'avatarUrl' | 'username' | 'rate'>;

export interface UserEntityInterface extends User {
  cars: CarEntityInterface[];
  rideHistory: RideHistoryEntityInterface[];
}

@Entity('user')
export class UserEntity implements UserEntityInterface {
  @PrimaryColumn({ type: 'uuid' })
  id: string | 'app-user';

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column({ select: false }) // Prevent password from being selected by default (for security) => Add .addSelect('user.password') to query to get password in query
  password: string;

  @Column({ type: 'text', nullable: true })
  avatarUrl: string | null;

  @Column({ type: 'enum', enum: UserType, default: UserType.PASSENGER })
  type: UserType;

  @Column({ type: 'boolean', default: false })
  acceptsSmoking: boolean;

  @Column({ type: 'boolean', default: false })
  acceptsPets: boolean;

  @Column({ type: 'jsonb', default: [] })
  customRules: string[];

  @Column()
  credits: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  rate: number | null;

  @OneToMany(() => CarEntity, (car) => car.owner, { cascade: true, onDelete: 'CASCADE' })
  cars: CarEntity[];

  @OneToMany(() => RideHistoryEntity, (history) => history.user)
  rideHistory: RideHistoryEntity[];
}
