import { Column, Entity, Index, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { RideEntity, RideEntityInterface } from './ride.entity';
import { CarEntity, CarEntityInterface } from './car.entity';
import { RideHistoryEntity, RideHistoryEntityInterface } from './rideHistory.entity';
import { TransactionEntity, TransactionEntityInterface } from './transaction.entity';

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
}

export interface UserEntityInterface extends User {
	ridesAsDriver: RideEntityInterface[];
	ridesAsPassenger: RideEntityInterface[];
	cars: CarEntityInterface[];
	rideHistory: RideHistoryEntityInterface[];
	transactionAsPayer: TransactionEntityInterface[];
	transactionAsReceiver: TransactionEntityInterface[];
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

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	credits: number;

	@OneToMany(() => RideEntity, (ride) => ride.driver)
	ridesAsDriver: RideEntityInterface[];

	@ManyToMany(() => RideEntity, (ride) => ride.passengers)
	ridesAsPassenger: RideEntityInterface[];

	@OneToMany(() => CarEntity, (car) => car.owner, { cascade: true, onDelete: 'CASCADE' })
	cars: CarEntity[];

	@OneToMany(() => RideHistoryEntity, (history) => history.user)
	rideHistory: RideHistoryEntity[];

	@OneToMany(() => TransactionEntity, (transaction) => transaction.payer)
	transactionAsPayer: TransactionEntity[];

	@OneToMany(() => TransactionEntity, (transaction) => transaction.receiver)
	transactionAsReceiver: TransactionEntity[];
}
