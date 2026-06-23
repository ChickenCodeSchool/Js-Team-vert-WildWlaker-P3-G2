import type { RequestHandler } from "express";

import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const users = await userRepository.readAll({
      startDate: typeof startDate === "string" ? startDate : undefined,
      endDate: typeof endDate === "string" ? endDate : undefined,
    });

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const updateAvatar: RequestHandler = async (req, res, next) => {
  try {
    const id_user = Number(req.params.id);
    const { avatar_url } = req.body;

    await userRepository.updateAvatar(id_user, avatar_url);

    res.status(200).json({
      message: "Avatar mis à jour avec succès",
      avatar_url,
    });
  } catch (err) {
    next(err);
  }
};

const uploadAvatar: RequestHandler = async (req, res, next) => {
  try {
    const id_user = Number(req.params.id);

    if (!req.file) {
      res.status(400).json({
        message: "Aucune image envoyée",
      });
      return;
    }

    const avatar_url = `/uploads/${req.file.filename}`;

    await userRepository.updateAvatar(id_user, avatar_url);

    res.status(200).json({
      message: "Avatar uploadé avec succès",
      avatar_url,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const id_user = Number(req.params.id);

    await userRepository.delete(id_user);

    res.status(200).json({
      message: "Client supprimé avec succès",
      id: id_user,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  updateAvatar,
  uploadAvatar,
  deleteUser,
};
