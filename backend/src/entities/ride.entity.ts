import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity, UserEntityInterface, UserLight } from './user.entity';
import { CarEntity, CarEntityInterface, CarLight } from './car.entity';
import { Point } from 'geojson';

export enum RideStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface RideLocation {
  address: string | null;
  postalCode: string | null;
  city: string | null;
  coordinate: Coordinate;
}

export interface Ride {
  id: string;
  reservedSeats: number | null;
  price: number;
  balance: number;
  departureDate: Date;
  arrivalDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  arrivalLocation: RideLocation;
  departureLocation: RideLocation;
  arrivalPoint: Point;
  departurePoint: Point;
  status: RideStatus;
}

export interface SearchedRide extends Ride {
  car: CarLight;
  driver: UserLight;
}

export interface PublicRideDetails extends Ride {
  car: CarEntityInterface;
  driver: UserEntityInterface;
  passengerIds: string[];
}

export interface RideEntityInterface extends Ride {
  driver: UserEntityInterface;
  car: CarEntityInterface;
  passengers: UserEntityInterface[];
}

@Entity('ride')
export class RideEntity implements RideEntityInterface {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'integer', nullable: true })
  reservedSeats: number | null;

  @Column()
  price: number;

  @Column()
  balance: number;

  @Column()
  @Index('ride_departure_date_index', ['departureDate'])
  departureDate: Date;

  @Column()
  arrivalDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date | null;

  @Column('geometry', {
    spatialFeatureType: 'Point',
    srid: 4326,
    select: false,
  })
  @Index({ spatial: true })
  arrivalPoint: Point;

  @Column('geometry', {
    spatialFeatureType: 'Point',
    srid: 4326,
    select: false,
  })
  @Index({ spatial: true })
  departurePoint: Point;

  @Column('jsonb')
  @Index('ride_arrival_location_index', ['arrivalLocation'])
  arrivalLocation: RideLocation;

  @Column('jsonb')
  @Index('ride_departure_location_index', ['departureLocation'])
  departureLocation: RideLocation;

  @Column({ type: 'enum', enum: RideStatus, default: RideStatus.UPCOMING })
  @Index('ride_status_index', ['status'])
  status: RideStatus;

  @ManyToOne(() => UserEntity)
  @Index('ride_driver_index', ['driver'])
  @JoinColumn()
  driver: UserEntityInterface;

  @ManyToOne(() => CarEntity)
  @JoinColumn()
  car: CarEntityInterface;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'ride_user_passenger', // Nom de la table de jointure
    joinColumn: {
      name: 'rideId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  passengers: UserEntity[];
}
