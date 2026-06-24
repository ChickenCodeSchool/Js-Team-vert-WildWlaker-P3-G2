import type { RequestHandler } from "express";
import notificationRepository from "./notificationRepository";

const readByUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const notifications = await notificationRepository.readByUser(userId);
    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

const markRead: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await notificationRepository.markRead(id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

const markAllRead: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    await notificationRepository.markAllRead(userId);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export default { readByUser, markRead, markAllRead };
