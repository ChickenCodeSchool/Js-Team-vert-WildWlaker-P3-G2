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

const register: RequestHandler = async (req, res, next) => {
  console.log("REGISTER ACTION");
  console.log(req.body);

  try {
    const { email, password, role } = req.body;

    await userRepository.create({
      email,
      password,
      user_type: role,
    });

    res.status(201).json({
      message: "Utilisateur créé",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.readByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }
    res.json({
      id: user.id_user,
      email: user.email,
      role: user.user_type,
    });
  } catch (err) {
    next(err);
  }
  console.log("LOGIN HIT");
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

export default { browse, deleteUser, register, login };
