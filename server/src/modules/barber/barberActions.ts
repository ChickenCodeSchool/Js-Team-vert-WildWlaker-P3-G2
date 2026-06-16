import type { RequestHandler } from "express";

// Import access to data
import barberRepository from "./barberRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all barbers
    const { startDate, endDate } = req.query;
    const barbers = await barberRepository.readAll({
      startDate: typeof startDate === "string" ? startDate : undefined,
      endDate: typeof endDate === "string" ? endDate : undefined,
    });

    // Respond with the barbers in JSON format
    res.json(barbers);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const edit: RequestHandler = async (req, res, next) => {
  try {
    const id_user = Number(req.params.id);
    const updatedCustomerData = { ...req.body, id_user };

    // Appel au repository pour sauvegarder en BDD
    await barberRepository.update(updatedCustomerData);

    // On renvoie un statut 204 (No Content) ou 200 avec les données
    res.status(200).json({
      message: "Client mis à jour avec succès",
      data: updatedCustomerData,
    });
  } catch (err) {
    next(err);
  }
};

export default { browse, edit };
