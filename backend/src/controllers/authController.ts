import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import * as jsonwebtoken from "jsonwebtoken";
import { User } from "../models/sequelize/User";
import { UserProfile } from "../models/sequelize/UserProfile";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      email,
      password,
      createdFor,
      firstName,
      lastName,
      gender,
      countryCodeId,
      mobile,
      dob,
      countryId,
      motherTongueId,
      heightCm,
      physicalStatus,
      maritalStatus,
      childrenCount,
      religionId,
      casteId,
      subcaste,
      stateId,
      cityId,
      educationId,
      employmentTypeId,
      occupationId,
      incomeCurrencyId,
      incomeRangeId,
      familyStatus,
      aboutMe,
      diet,
      drink,
      smoke,
      fitness,
      spirituality,
      ambition,
      childrenPreference,
      careerAfterMarriage,
      relocation,
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      passwordHash,
      role: "user",
      createdFor: [
        "Myself",
        "Self",
        "Parent",
        "Guardian",
        "Friend",
        "Sister",
        "Brother",
        "Daughter",
        "Son",
        "Relative",
      ].includes(createdFor)
        ? createdFor
        : "Self",
      firstName,
      lastName: lastName || null,
      gender: ["Male", "Female", "Other"].includes(gender) ? gender : "Other",
      countryCodeId: countryCodeId ? Number(countryCodeId) : null,
      mobile,
    });

    await UserProfile.create({
      userId: newUser.id,
      dob: dob || null,
      countryId: countryId || null,
      motherTongueId: motherTongueId || null,
      heightCm: heightCm || null,
      physicalStatus: physicalStatus || "Normal",
      maritalStatus: maritalStatus || "Never Married",
      childrenCount: childrenCount || 0,
      religionId: religionId || null,
      casteId: casteId || null,
      subcaste: subcaste || null,
      stateId: stateId || null,
      cityId: cityId || null,
      educationId: educationId || null,
      employmentTypeId: employmentTypeId || null,
      occupationId: occupationId || null,
      incomeCurrencyId: incomeCurrencyId || null,
      incomeRangeId: incomeRangeId || null,
      familyStatus: familyStatus || null,
      aboutMe: aboutMe || null,
      diet: diet || null,
      drink: drink || null,
      smoke: smoke || null,
      fitness: fitness || null,
      spirituality: spirituality || null,
      ambition: ambition || null,
      childrenPreference: childrenPreference || null,
      careerAfterMarriage: careerAfterMarriage || null,
      relocation: relocation || null,
    });

    const token = jsonwebtoken.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "7d",
      },
    );

    res.status(201).json({
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
      token,
    });
  } catch (error: any) {
    console.error("Register error DETAILED:", {
      message: error.message,
      stack: error.stack,
      payload: req.body,
    });
    res.status(500).json({
      message: "Server error during registration",
      details: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jsonwebtoken.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "7d",
      },
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
