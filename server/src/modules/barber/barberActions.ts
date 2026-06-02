import type { RequestHandler } from "express";

import barberRepository from "./barberRepository";

const browse: RequestHandler = async (_req, res, next) => {
  try {
    const barbers = await barberRepository.readAll();

    res.json(barbers);
  } catch (err) {
    next(err);
  }
};

export default { browse };
