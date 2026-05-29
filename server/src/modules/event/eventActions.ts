import type { RequestHandler } from "express";

// Import access to data
import eventRepository from "./eventRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all event
    const event = await eventRepository.readAll();

    // Respond with the event in JSON format
    res.json(event);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
