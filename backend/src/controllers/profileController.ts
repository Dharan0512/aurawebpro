import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import {
  User,
  UserProfile,
  PartnerPreference,
  Religion,
  Education,
  Occupation,
  EmploymentType,
  City,
  State,
  Country,
  MotherTongue,
  UserPhoto,
  Caste,
  IncomeRange,
  Currency,
  UserDraft,
} from "../models/sequelize";

export const saveDraft = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const { stepData, lastStep } = req.body;

    const [draft] = await UserDraft.upsert({
      userId,
      stepData,
      lastStep,
    });

    res.status(200).json({ message: "Draft saved", draft });
  } catch (error) {
    console.error("Save draft error:", error);
    res.status(500).json({ message: "Server error saving draft" });
  }
};

export const getDraft = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const draft = await UserDraft.findOne({ where: { userId } });

    res.status(200).json(draft || { stepData: {}, lastStep: 0 });
  } catch (error) {
    console.error("Get draft error:", error);
    res.status(500).json({ message: "Server error fetching draft" });
  }
};

export const createOrUpdateProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const profileData = req.body;

    // --- MAPPING LEGACY NO-SQL PAYLOAD TO SQL NORMALIZED MASTER TABLES ---

    // 1. Religion
    let religionId =
      profileData.religionId || profileData.basicDetails?.religionId;
    if (!religionId) {
      const religionName =
        profileData.basicDetails?.religion || profileData.religion || "Other";
      let religion = await Religion.findOne({ where: { name: religionName } });
      if (!religion) religion = await Religion.create({ name: religionName });
      religionId = religion.id;
    }

    // 2. Education
    let educationId =
      profileData.educationId ||
      profileData.professionalInfo?.educationId ||
      profileData.educationLevel;
    if (!educationId) {
      const eduName =
        profileData.professionalInfo?.education ||
        profileData.education ||
        "Other";
      let education = await Education.findOne({ where: { name: eduName } });
      if (!education)
        education = await Education.create({ name: eduName, level: "UG" });
      educationId = education.id;
    }

    // 3. Location
    let cityId = profileData.cityId || profileData.basicDetails?.cityId;
    if (!cityId) {
      const locName =
        profileData.basicDetails?.location || profileData.location || "Unknown";
      let city = await City.findOne({ where: { name: locName } });
      if (!city) {
        const country = await Country.findOrCreate({
          where: { name: "Default Country", isoCode: "DC", phoneCode: "00" },
        });
        const state = await State.findOrCreate({
          where: { name: "Default State", countryId: country[0].id },
        });
        city = await City.create({ name: locName, stateId: state[0].id });
      }
      cityId = city.id;
    }

    // Update the base User details
    await User.update(
      {
        firstName:
          profileData.firstName || profileData.basicDetails?.name || "User",
        lastName: profileData.lastName || "",
        gender: ["Male", "Female", "Other"].includes(
          profileData.gender || profileData.basicDetails?.gender,
        )
          ? profileData.gender || profileData.basicDetails.gender
          : "Other",
        createdFor: ["Self", "Parent", "Guardian"].includes(
          profileData.createdFor || profileData.profileType,
        )
          ? profileData.createdFor || profileData.profileType
          : "Self",
      },
      { where: { id: userId } },
    );

    // Helper to handle empty strings or missing IDs
    const parseId = (id: any) => {
      if (id === "" || id === null || id === undefined) return null;
      const parsed = parseInt(id);
      return isNaN(parsed) ? null : parsed;
    };

    // Upsert UserProfile
    const dobValue =
      profileData.dob || profileData.basicDetails?.dob
        ? new Date(profileData.dob || profileData.basicDetails.dob)
        : null;
    const dob = dobValue && !isNaN(dobValue.getTime()) ? dobValue : null;

    const [userProfile] = await UserProfile.upsert({
      userId,
      dob,
      heightCm: parseInt(profileData.height || profileData.heightCm) || 170,
      physicalStatus: profileData.physicalStatus || "Normal",
      maritalStatus: profileData.maritalStatus || "Never Married",
      childrenCount: parseInt(profileData.childrenCount) || 0,
      religionId: parseId(religionId),
      educationId: parseId(educationId),
      cityId: parseId(cityId),
      stateId: parseId(profileData.stateId),
      countryId: parseId(profileData.countryId),
      motherTongueId: parseId(
        profileData.motherTongueId || profileData.motherTongue,
      ), // Fallback if ID is string name (needs fix)
      casteId: parseId(profileData.casteId),
      subcaste: profileData.subcaste || profileData.subCaste || "",
      employmentTypeId: parseId(
        profileData.employmentTypeId || profileData.employmentType,
      ), // Needs fix
      occupationId: parseId(profileData.occupationId || profileData.occupation), // Needs fix
      incomeRangeId: parseId(
        profileData.incomeRangeId || profileData.incomeRange,
      ), // Needs fix
      familyStatus: profileData.familyStatus || "Middle Class",
    });

    // Upsert PartnerPreference
    await PartnerPreference.upsert({
      userId,
      minAge:
        profileData.partnerAgeMin ||
        profileData.preferences?.ageRange?.min ||
        18,
      maxAge:
        profileData.partnerAgeMax ||
        profileData.preferences?.ageRange?.max ||
        40,
      religionId: parseId(religionId),
      educationId: parseId(educationId),
    });

    res.status(200).json({
      message: "Profile saved successfully to MariaDB",
      profile: userProfile,
    });
  } catch (error: any) {
    console.error("Detailed Profile Save Error:", {
      message: error.message,
      name: error.name,
      errors: error.errors, // For Sequelize validation errors
      stack: error.stack,
    });
    res.status(500).json({
      message: "Server error saving profile",
      details: error.message,
    });
  }
};

export const getMyProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const user = await User.findByPk(userId);
    const userProfile = await UserProfile.findOne({
      where: { userId },
      include: [
        Religion,
        Education,
        City,
        State,
        Country,
        MotherTongue,
        Caste,
        EmploymentType,
        Occupation,
        IncomeRange,
      ],
    });
    const preferences = await PartnerPreference.findOne({
      where: { userId },
      include: [Religion, Education],
    });
    const userPhotos = await UserPhoto.findAll({
      where: { userId },
      order: [["order", "ASC"]],
    });

    if (!userProfile) {
      res.status(200).json({
        user,
        profile: null,
        preferences: null,
        photos: userPhotos.map((p) => ({ id: p.id, url: p.url })),
      });
      return;
    }

    res.status(200).json({
      user,
      profile: userProfile,
      preferences,
      photos: userPhotos.map((p) => ({ id: p.id, url: p.url })),
    });
  } catch (error) {
    console.error("Fetch profile error:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

export const uploadPhotos = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    // req.file is populated by multer
    const file = (req as any).file;

    if (!file) {
      res.status(400).json({ message: "Please upload a file" });
      return;
    }

    // In a real app, you'd upload to S3/Cloudinary and get a URL
    // For now, we'll use a local path or a mock URL
    const photoUrl = `/uploads/${file.filename}`;

    const photo = await UserPhoto.create({
      userId,
      url: photoUrl,
      isMain: false,
    });

    res.status(201).json({
      message: "Photo uploaded successfully",
      photo,
    });
  } catch (error) {
    console.error("Photo upload error:", error);
    res.status(500).json({ message: "Server error uploading photo" });
  }
};

export const deletePhoto = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const { photoId } = req.params;

    const photo = await UserPhoto.findOne({
      where: { id: photoId, userId },
    });

    if (!photo) {
      res.status(404).json({ message: "Photo not found or unauthorized" });
      return;
    }

    // Optional: Delete physical file from uploads folder if using local storage
    // const fs = require('fs');
    // const path = require('path');
    // const filePath = path.join(__dirname, '../../', photo.url);
    // if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await photo.destroy();

    res.status(200).json({
      message: "Photo deleted successfully",
    });
  } catch (error) {
    console.error("Photo delete error:", error);
    res.status(500).json({ message: "Server error deleting photo" });
  }
};
