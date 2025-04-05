import mongoose, { InferSchemaType } from 'mongoose';

const RideReviewSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => crypto.randomUUID() },
    rideId: { type: String, required: true },
    userId: { type: String, required: true },
    driverId: { type: String, required: true },
    username: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    approved: { type: Boolean, required: false, default: null },
    dispute: { type: Boolean, required: false, default: null },
    comment: { type: String },
  },
  { timestamps: true },
);

RideReviewSchema.index({ userId: 1, rideId: 1 }, { unique: true });

export const RideReview = mongoose.model('RideReview', RideReviewSchema);

export type ReviewType = InferSchemaType<typeof RideReviewSchema>;

export default RideReview;
