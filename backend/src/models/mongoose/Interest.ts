import mongoose, { Schema, Document } from "mongoose";

export interface IInterest extends Document {
  senderId: number; // MariaDB User ID
  receiverId: number; // MariaDB User ID
  status: "pending" | "accepted" | "declined" | "withdrawn";
  message?: string;
}

const InterestSchema: Schema = new Schema(
  {
    senderId: { type: Number, required: true },
    receiverId: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "withdrawn"],
      default: "pending",
    },
    message: { type: String, maxlength: 500 },
  },
  { timestamps: true },
);

// Prevent duplicate pending interests
InterestSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

export const Interest = mongoose.model<IInterest>("Interest", InterestSchema);
