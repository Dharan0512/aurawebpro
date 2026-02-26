import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  senderId: number;
  receiverId: number;
  text: string;
  read: boolean;
  messageType: "text" | "image" | "video_invite";
}

const MessageSchema: Schema = new Schema(
  {
    senderId: { type: Number, required: true },
    receiverId: { type: Number, required: true },
    text: { type: String, required: true },
    read: { type: Boolean, default: false },
    messageType: {
      type: String,
      enum: ["text", "image", "video_invite"],
      default: "text",
    },
  },
  { timestamps: true },
);

// Index to quickly fetch a chat history between two users
MessageSchema.index({ senderId: 1, receiverId: 1 });

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
