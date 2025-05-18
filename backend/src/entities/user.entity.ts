import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { CarEntity, CarEntityInterface } from './car.entity';

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
  isStaff: boolean;
  isAdmin: boolean;
  isBlocked: boolean;
  customRules: string[];
  credits: number;
  isInvitationPending: boolean;
  termsAcceptedAt: Date | null;
  termsAccepted: boolean;
  rate: number | null;
}

export type UserLight = Pick<User, 'id' | 'avatarUrl' | 'username' | 'rate'>;

export interface UserEntityInterface extends User {
  cars: CarEntityInterface[];
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

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @Column({ type: 'boolean', default: false })
  isStaff: boolean;

  @Column({ type: 'boolean', default: false })
  isBlocked: boolean;

  @Column({ type: 'jsonb', default: [] })
  customRules: string[];

  @Column()
  credits: number;

  @Column({ type: 'boolean', default: false })
  isInvitationPending: boolean;

  @Column({ type: 'timestamp', nullable: true })
  termsAcceptedAt: Date | null;

  @Column({ type: 'boolean', default: false })
  termsAccepted: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  rate: number | null;

  @OneToMany(() => CarEntity, (car) => car.owner, { cascade: true, onDelete: 'CASCADE' })
  cars: CarEntity[];
}
