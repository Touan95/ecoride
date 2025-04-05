import mongoose, { InferSchemaType } from "mongoose";

const RideReviewSchema = new mongoose.Schema({
  rideId: { type: String, required: true }, 
  userId: { type: String, required: true }, 
  driverId: { type: String, required: true }, 
  username: { type: String, required: true }, 
  rating: { type: Number, required: true, min: 0, max: 5 },
  approved: { type: Boolean, required: true, default: false },
  dispute: { type: Boolean, required: true, default: false },
  comment: { type: String },
},
{ timestamps: true });

RideReviewSchema.index({ userId: 1, rideId: 1 }, { unique: true });

export const RideReview = mongoose.model("RideReview", RideReviewSchema);

export type ReviewType = InferSchemaType<typeof RideReviewSchema>;

export default RideReview;