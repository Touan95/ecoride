export enum Energy {
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
  HYBRID = 'hybrid',
  ELECTRIC = 'electric',
  UNKNOWN = 'unknown'
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
  isDeleted: boolean;
}

export type CarLight = Pick<Car, 'id' | 'energy' | 'seats'>;
