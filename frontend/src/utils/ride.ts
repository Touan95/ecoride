import { RideStatus } from '@/api/lib/user';

export const getRideStatusLabel = (status: RideStatus) => {
  switch (status) {
    case RideStatus.CANCELLED:
      return 'Annulé par le chauffeur';
    case RideStatus.COMPLETED:
      return 'Finalisé';
    case RideStatus.ONGOING:
      return 'En cours';
    case RideStatus.UPCOMING:
      return 'A venir';
  }
};

export const SERVICE_FEE = 2;
