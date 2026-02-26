import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Block, Report, SuccessStory } from "../models/sequelize";

export const blockUser = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const blockerId = req.user!.id;
    const { blockedId } = req.body;
    const targetId = parseInt(blockedId, 10);

    // Upsert equivalent for block
    const existing = await Block.findOne({
      where: { blockerId, blockedId: targetId },
    });
    if (!existing) {
      await Block.create({ blockerId, blockedId: targetId });
    }

    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error parsing block" });
  }
};

export const reportUser = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const reporterId = req.user!.id;
    const { reportedId, reason } = req.body;
    const targetId = parseInt(reportedId, 10);

    const report = await Report.create({
      reporterId,
      reportedId: targetId,
      reason,
    });
    res.status(201).json({ message: "User reported successfully", report });
  } catch (error) {
    res.status(500).json({ message: "Server error saving report" });
  }
};

export const updateSuccessStatus = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const partner1Id = req.user!.id;
    const { partner2Id, status, storyText, weddingDate } = req.body;
    const targetPartnerId = parseInt(partner2Id, 10);

    let story = await SuccessStory.findOne({
      where: {
        partner1Id: [partner1Id, targetPartnerId],
        partner2Id: [partner1Id, targetPartnerId],
      },
    });

    if (story) {
      const wDate = weddingDate ? new Date(weddingDate) : null;
      story = await story.update({
        status,
        storyText,
        weddingDate: wDate && !isNaN(wDate.getTime()) ? wDate : null,
      });
    } else {
      const wDate = weddingDate ? new Date(weddingDate) : null;
      story = await SuccessStory.create({
        partner1Id,
        partner2Id: targetPartnerId,
        status,
        storyText,
        weddingDate: wDate && !isNaN(wDate.getTime()) ? wDate : null,
      });
    }

    res.status(200).json({ message: "Status updated", story });
  } catch (error) {
    res.status(500).json({ message: "Server error updating story" });
  }
};
