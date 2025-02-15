import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity, UserEntityInterface } from './user.entity';
import { RideEntity, RideEntityInterface } from './ride.entity';

export enum RideRole {
	DRIVER = 'driver',
	PASSENGER = 'passenger',
}

export interface RideHistory {
	id: string;
	role: RideRole;
	date: Date;
	comment: string | null;
	rating: number | null;
}

export interface RideHistoryEntityInterface extends RideHistory {
	user: UserEntityInterface;
	ride: RideEntityInterface;
}

@Entity('ride_history')
export class RideHistoryEntity implements RideHistoryEntityInterface {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'enum', enum: RideRole })
	role: RideRole;

	@Index()
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	date: Date;

	@Column({ nullable: true })
	comment: string | null;

	@Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, default: null })
	rating: number | null;

	@ManyToOne(() => UserEntity, (user) => user.rideHistory, { onDelete: 'CASCADE' })
	@Index('ride_history_user_index', ['user'])
	user: UserEntity;

	@ManyToOne(() => RideEntity, { onDelete: 'CASCADE' })
	ride: RideEntity;
}
