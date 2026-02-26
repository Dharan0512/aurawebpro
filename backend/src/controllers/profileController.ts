import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import {
  User,
  UserProfile,
  UserPreference,
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
  FamilyDetails,
  HoroscopeDetails,
  LocationLifestyle,
  EducationCareer,
  Badge,
} from "../models/sequelize";
import { sequelize } from "../config/db.postgres";

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
  const transaction = await sequelize.transaction();
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const profileData = req.body;

    // 1. Update the base User details
    await User.update(
      {
        firstName:
          profileData.firstName || profileData.basicDetails?.name || "User",
        lastName: profileData.lastName || "",
        gender: ["Male", "Female", "Other"].includes(
          profileData.gender || profileData.basicDetails?.gender,
        )
          ? profileData.gender || profileData.basicDetails?.gender
          : "Other",
        createdFor: ["Self", "Parent", "Guardian"].includes(
          profileData.createdFor || profileData.profileType,
        )
          ? profileData.createdFor || profileData.profileType
          : "Self",
      },
      { where: { id: userId }, transaction },
    );

    // Helper to handle empty strings or missing IDs
    const parseId = (id: any) => {
      if (id === "" || id === null || id === undefined) return null;
      const parsed = parseInt(id);
      return isNaN(parsed) ? null : parsed;
    };

    // 2. Upsert UserProfile (Core Identity)
    const dobValue =
      profileData.dob || profileData.basicDetails?.dob
        ? new Date(profileData.dob || profileData.basicDetails.dob)
        : null;
    const dob = dobValue && !isNaN(dobValue.getTime()) ? dobValue : null;

    const [userProfile] = await UserProfile.upsert(
      {
        userId,
        dob,
        heightCm: parseInt(profileData.height || profileData.heightCm) || 170,
        physicalStatus: profileData.physicalStatus || "Normal",
        maritalStatus: profileData.maritalStatus || "Never Married",
        childrenCount: parseInt(profileData.childrenCount) || 0,
        religionId: parseId(profileData.religionId),
        casteId: parseId(profileData.casteId),
        motherTongueId: parseId(profileData.motherTongueId),
        subcaste: profileData.subcaste || "",
        complexion: profileData.complexion || "",
        shortBio: profileData.shortBio || profileData.aboutMe || "",
      },
      { transaction },
    );

    const userProfileId = userProfile.id;

    // 3. Upsert FamilyDetails
    await FamilyDetails.upsert(
      {
        userProfileId,
        fatherName: profileData.fatherName || null,
        fatherOccupation: profileData.fatherOccupation || null,
        motherName: profileData.motherName || null,
        motherOccupation: profileData.motherOccupation || null,
        familyType: profileData.familyType || null,
        familyStatus: profileData.familyStatus || null,
        siblingsCount: parseInt(profileData.siblingsCount) || 0,
        ownHouse:
          profileData.ownHouse === true || profileData.ownHouse === "true",
        nativeDistrict: profileData.nativeDistrict || null,
        familyLocation: profileData.familyLocation || null,
      },
      { transaction },
    );

    // 4. Upsert HoroscopeDetails
    await HoroscopeDetails.upsert(
      {
        userProfileId,
        star: profileData.star || null,
        rasi: profileData.rasi || null,
        laknam: profileData.laknam || null,
        gothram: profileData.gothram || null,
        sevvaiDhosham: profileData.sevvaiDhosham || null,
        rahuKetuDhosham: profileData.rahuKetuDhosham || null,
        birthTime: profileData.birthTime || null,
        birthPlace: profileData.birthPlace || null,
      },
      { transaction },
    );

    // 5. Upsert LocationLifestyle
    await LocationLifestyle.upsert(
      {
        userProfileId,
        country: profileData.country || null,
        state: profileData.state || null,
        city: profileData.city || null,
        relocatePreference: profileData.relocatePreference || null,
        diet: profileData.diet || null,
        drink: profileData.drink || null,
        smoke: profileData.smoke || null,
        fitnessLevel: profileData.fitnessLevel || null,
        ambition: parseId(profileData.ambition),
        familyOrientation: parseId(profileData.familyOrientation),
        emotionalStability: parseId(profileData.emotionalStability),
        communicationStyle: parseId(profileData.communicationStyle),
        spiritualInclination: parseId(profileData.spiritualInclination),
        languages: profileData.languages || [],
        hobbies: profileData.hobbies || [],
      },
      { transaction },
    );

    // 6. Upsert EducationCareer
    await EducationCareer.upsert(
      {
        userProfileId,
        highestEducation: profileData.highestEducation || null,
        fieldOfStudy: profileData.fieldOfStudy || null,
        college: profileData.college || null,
        employmentType: profileData.employmentType || null,
        companyName: profileData.companyName || null,
        designation: profileData.designation || null,
        incomeRange: profileData.incomeRange || null,
        exactIncome: profileData.exactIncome
          ? parseInt(profileData.exactIncome)
          : null,
        careerPlanAfterMarriage: profileData.careerPlanAfterMarriage || null,
      },
      { transaction },
    );

    // 7. Upsert UserPreference
    await UserPreference.upsert(
      {
        userId,
        minAge: parseInt(profileData.partnerAgeMin) || 18,
        maxAge: parseInt(profileData.partnerAgeMax) || 40,
        minHeightCm: parseInt(profileData.partnerHeightMin) || null,
        maxHeightCm: parseInt(profileData.partnerHeightMax) || null,
        maritalStatus: profileData.partnerMaritalStatus || null,
        religionId: parseId(profileData.religionId),
        casteId: parseId(profileData.casteId),
        preferredLocation: profileData.preferredLocation || null,
        preferredEducation: profileData.preferredEducation || null,
        preferredIncomeRange: profileData.preferredIncomeRange || null,
      },
      { transaction },
    );

    await transaction.commit();

    res.status(200).json({
      message: "Profile updated successfully",
      profile: userProfile,
    });
  } catch (error: any) {
    await transaction.rollback();
    console.error("Detailed Profile Save Error:", error);
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
        City,
        State,
        Country,
        MotherTongue,
        Caste,
        FamilyDetails,
        HoroscopeDetails,
        LocationLifestyle,
        EducationCareer,
        Badge,
      ],
    });
    const preferences = await UserPreference.findOne({
      where: { userId },
      include: [Religion, Education, Country, State],
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
export const uploadHoroscope = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const file = (req as any).file;

    if (!file) {
      res.status(400).json({ message: "Please upload a file" });
      return;
    }

    const imageUrl = `/uploads/${file.filename}`;

    const profile = await UserProfile.findOne({ where: { userId } });
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    const [horoscope] = await HoroscopeDetails.upsert({
      userProfileId: profile.id,
      horoscopeImageUrl: imageUrl,
    });

    res.status(200).json({
      message: "Horoscope uploaded successfully",
      horoscope,
    });
  } catch (error) {
    console.error("Horoscope upload error:", error);
    res.status(500).json({ message: "Server error uploading horoscope" });
  }
};

export const deleteHoroscope = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userId = req.user.id;
    const profile = await UserProfile.findOne({ where: { userId } });
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    const horoscope = await HoroscopeDetails.findOne({
      where: { userProfileId: profile.id },
    });

    if (!horoscope || !horoscope.horoscopeImageUrl) {
      res.status(404).json({ message: "Horoscope image not found" });
      return;
    }

    // Optional: Delete physical file
    // const fs = require('fs');
    // const path = require('path');
    // const filePath = path.join(process.cwd(), horoscope.horoscopeImageUrl);
    // if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    horoscope.horoscopeImageUrl = null;
    await horoscope.save();

    res.status(200).json({
      message: "Horoscope image deleted successfully",
    });
  } catch (error) {
    console.error("Horoscope delete error:", error);
    res.status(500).json({ message: "Server error deleting horoscope" });
  }
};
