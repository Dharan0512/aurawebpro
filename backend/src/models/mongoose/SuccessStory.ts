import mongoose, { Schema, Document } from "mongoose";

export interface ISuccessStory extends Document {
  partner1Id: number;
  partner2Id: number;
  status: "discussion" | "engaged" | "married";
  storyText?: string;
  weddingDate?: Date;
  photos: string[];
  isVerified: boolean;
}

const SuccessStorySchema: Schema = new Schema(
  {
    partner1Id: { type: Number, required: true },
    partner2Id: { type: Number, required: true },
    status: {
      type: String,
      enum: ["discussion", "engaged", "married"],
      required: true,
    },
    storyText: { type: String },
    weddingDate: { type: Date },
    photos: [{ type: String }],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const SuccessStory = mongoose.model<ISuccessStory>(
  "SuccessStory",
  SuccessStorySchema,
);
