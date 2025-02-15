import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User, UserEntity } from './user.entity';

export enum TransactionType {
	EARNED = 'earned',
	SPENT = 'spent',
}

export interface Transaction {
	id: string;
	amount: number;
	transactionType: TransactionType;
	date: Date;
	description: string;
}

export interface TransactionEntityInterface extends Transaction {
	payer: User;
	receiver: User;
}

@Entity('transaction')
export class TransactionEntity implements TransactionEntityInterface {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	amount: number;

	@Column({ type: 'enum', enum: TransactionType })
	transactionType: TransactionType;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	date: Date;

	@Column({ type: 'text' })
	description: string;

	@ManyToOne(() => UserEntity, (user) => user.transactionAsPayer)
	payer: UserEntity;

	@ManyToOne(() => UserEntity, (user) => user.transactionAsReceiver)
	receiver: UserEntity;
}
