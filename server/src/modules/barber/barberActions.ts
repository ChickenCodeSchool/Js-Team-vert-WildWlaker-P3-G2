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

export default { browse };
