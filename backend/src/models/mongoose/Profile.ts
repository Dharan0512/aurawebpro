import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  userId: number; // References MariaDB User ID
  profileType: "self" | "parent" | "guardian";
  basicDetails: {
    name: string;
    gender: "Male" | "Female" | "Other";
    dob: Date;
    religion: string;
    location: string;
  };
  professionalInfo: {
    education: string;
    profession: string;
    incomeRange: string;
  };
  familyDetails: {
    familyType: "Nuclear" | "Joint";
    fatherProfession: string;
    motherProfession: string;
    siblings: number;
  };
  preferences: {
    ageRange: { min: number; max: number };
    religion: string;
    location: string;
    education: string;
  };
  photos: string[];
  horoscopeId?: string;
  compatibilityScore?: number; // Precomputed or dynamic
  profileCompletion: number;
}

const ProfileSchema: Schema = new Schema(
  {
    userId: { type: Number, required: true, unique: true },
    profileType: {
      type: String,
      enum: ["self", "parent", "guardian"],
      required: true,
    },
    basicDetails: {
      name: { type: String, required: true },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other", "male", "female", "other"],
        required: true,
      },
      dob: { type: Date, required: true },
      religion: { type: String, required: true },
      location: { type: String, required: true },
    },
    professionalInfo: {
      education: { type: String, default: "" },
      profession: { type: String, default: "" },
      incomeRange: { type: String, default: "" },
    },
    familyDetails: {
      familyType: {
        type: String,
        enum: ["nuclear", "joint", "Nuclear", "Joint"],
      },
      fatherProfession: { type: String, default: "" },
      motherProfession: { type: String, default: "" },
      siblings: { type: Number, default: 0 },
    },
    preferences: {
      ageRange: {
        min: { type: Number, default: 18 },
        max: { type: Number, default: 40 },
      },
      religion: { type: String },
      location: { type: String },
      education: { type: String },
    },
    photos: [{ type: String }],
    horoscopeId: { type: String },
    compatibilityScore: { type: Number, default: 0 },
    profileCompletion: { type: Number, default: 20 }, // Starts at 20% after basic step
  },
  { timestamps: true },
);

export const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);
