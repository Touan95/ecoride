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
}

export const carMock: Car = {
  id: 'fdsfsqdgfqsdfgsdf',
  seats: 3,
  brand: 'Volkswagen',
  model: 'Jetta',
  energy: Energy.DIESEL,
  color: ' Vert',
  plateNumber: 'DC-ERE-ZZ',
  registrationDate: new Date()
};
