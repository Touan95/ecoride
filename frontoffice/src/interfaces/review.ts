export const REVIEW_MAX_LENGTH = 300;

export interface Review {
  username: string;
  userId: string;
  driverId: string;
  rideId: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  comment?: string | null;
  approved: boolean;
  dispute: boolean;
}
