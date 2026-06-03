import type { RequestHandler } from "express";

// Import access to data
import appointmentRepository from "./appointmentRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (_req, res, next) => {
  try {
    // Fetch all appointments
    const appointments = await appointmentRepository.readAll();

    // Respond with the appointments in JSON format
    res.json(appointments);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
