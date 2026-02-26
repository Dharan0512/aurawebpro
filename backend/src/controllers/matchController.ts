import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import {
  User,
  UserProfile,
  Interest,
  Religion,
  City,
  Education,
} from "../models/sequelize";
import { Op } from "sequelize";
import { profileSerializer } from "../serializers/profileSerializer";

export const getDailyMatches = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const myUser = await User.findByPk(req.user.id);
    if (!myUser) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const oppositeGender = ["Male", "male"].includes(myUser.gender)
      ? "Female"
      : "Male";

    // Find opposite gender users from MySQL
    const matches = await UserProfile.findAll({
      include: [
        {
          model: User,
          where: {
            id: { [Op.ne]: req.user.id },
            gender: { [Op.in]: [oppositeGender, oppositeGender.toLowerCase()] },
          },
        },
        Religion,
        City,
        Education,
      ],
      limit: 10,
      order: [["createdAt", "DESC"]],
    });

    // Discover matches using serializer to unify response
    const matchesWithScores = (matches as any).map((match: any) =>
      profileSerializer.toPublicProfile(match),
    );

    res
      .status(200)
      .json(
        matchesWithScores.sort((a: any, b: any) => b.matchScore - a.matchScore),
      );
  } catch (error) {
    console.error("Discover matches error:", error);
    res.status(500).json({ message: "Server error fetching matches" });
  }
};

export const expressInterest = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { receiverId } = req.body; // message is no longer in Interest SQL table by default unless we add it to messages
    const senderId = req.user.id;
    const targetUserId = parseInt(receiverId, 10);

    if (senderId === targetUserId) {
      res.status(400).json({ message: "Cannot express interest in yourself" });
      return;
    }

    // Check if interest already exists
    const existing = await Interest.findOne({
      where: { senderId, receiverId: targetUserId },
    });

    if (existing) {
      res.status(400).json({ message: "Interest already sent" });
      return;
    }

    const newInterest = await Interest.create({
      senderId,
      receiverId: targetUserId,
      status: "pending",
    });

    res.status(201).json({
      message: "Interest expressed successfully",
      interest: newInterest,
    });
  } catch (error) {
    console.error("Express interest error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
