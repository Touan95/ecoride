export const REVIEW_MAX_LENGTH = 300;

export interface Review {
  _id: string;
  username: string;
  userId: string;
  driverId: string;
  rideId: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  comment?: string | null;
  approved: boolean | null;
  dispute: boolean | null;
}
