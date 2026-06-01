import type { RequestHandler } from "express";

// Import access to data
import reviewRepository from "./reviewRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (_req, res, next) => {
  try {
    // Fetch all reviews
    const reviews = await reviewRepository.readAll();

    // Respond with the reviews in JSON format
    res.json(reviews);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
