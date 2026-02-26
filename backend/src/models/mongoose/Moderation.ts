import mongoose, { Schema, Document } from "mongoose";

export interface IBlock extends Document {
  blockerId: number;
  blockedId: number;
}

const BlockSchema: Schema = new Schema(
  {
    blockerId: { type: Number, required: true },
    blockedId: { type: Number, required: true },
  },
  { timestamps: true },
);

BlockSchema.index({ blockerId: 1, blockedId: 1 }, { unique: true });

export const Block = mongoose.model<IBlock>("Block", BlockSchema);

export interface IReport extends Document {
  reporterId: number;
  reportedId: number;
  reason: string;
  status: "pending" | "reviewed" | "resolved";
}

const ReportSchema: Schema = new Schema(
  {
    reporterId: { type: Number, required: true },
    reportedId: { type: Number, required: true },
    reason: { type: String, required: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Report = mongoose.model<IReport>("Report", ReportSchema);
