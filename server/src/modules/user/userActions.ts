import type { RequestHandler } from "express";

// Import access to data
import userRepository from "./userRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    const { startDate, endDate } = req.query;
    const users = await userRepository.readAll({
      startDate: typeof startDate === "string" ? startDate : undefined,
      endDate: typeof endDate === "string" ? endDate : undefined,
    });

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const id_user = Number(req.params.id);

    // Appel au repository pour sauvegarder en BDD
    await userRepository.delete(id_user);

    // On renvoie un statut 204 (No Content) ou 200 avec les données
    res.status(200).json({
      message: "Client supprimé avec succès",
      id: id_user,
    });
  } catch (err) {
    next(err);
  }
};

export default { browse, deleteUser };
