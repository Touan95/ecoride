import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RideEntity, RideEntityInterface } from './ride.entity';

export interface PlatformCredit {
  id: string;
  credit: number;
  createdAt: Date;
}

export interface PlatformCreditEntityInterface extends PlatformCredit {
  ride: RideEntityInterface;
}

@Entity('platform_credit')
export class PlatformCreditEntity implements PlatformCreditEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  credit: number;

  @Index()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => RideEntity)
  @JoinColumn()
  @Index({ unique: true })
  ride: RideEntity;
}
