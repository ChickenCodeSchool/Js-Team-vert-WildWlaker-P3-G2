import type { RequestHandler } from "express";

// Import access to data
import customerRepository from "./customerRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (_req, res, next) => {
  try {
    // Fetch all customers
    const customers = await customerRepository.readAll();

    // Respond with the customers in JSON format
    res.json(customers);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse };
