import type { RequestHandler } from "express";

// Import access to data
import reviewRepository from "./reviewRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all reviews
    const { startDate, endDate } = req.query;
    const reviews = await reviewRepository.readAll({
      startDate: typeof startDate === "string" ? startDate : undefined,
      endDate: typeof endDate === "string" ? endDate : undefined,
    });

    // Respond with the reviews in JSON format
    res.json(reviews);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
