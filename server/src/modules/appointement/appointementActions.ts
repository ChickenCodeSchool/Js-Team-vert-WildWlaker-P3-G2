import type { RequestHandler } from "express";

// Import access to data
import appointementRepository from "./appointementRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all appointements
    const { startDate, endDate } = req.query;
    const appointements = await appointementRepository.readAll({
      startDate: typeof startDate === "string" ? startDate : undefined,
      endDate: typeof endDate === "string" ? endDate : undefined,
    });

    // Respond with the appointements in JSON format
    res.json(appointements);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
