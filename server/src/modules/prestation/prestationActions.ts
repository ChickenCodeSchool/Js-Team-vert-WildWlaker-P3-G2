import type { RequestHandler } from "express";

// Import access to data
import PrestationRepository from "./prestationRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all Prestations
    const Prestations = await PrestationRepository.readAll();

    // Respond with the Prestations in JSON format
    res.json(Prestations);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
