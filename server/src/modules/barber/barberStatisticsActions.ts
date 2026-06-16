import type { RequestHandler } from "express";
import barberStatisticsRepository from "./barberStatisticsRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const barberId = Number(req.params.id);
    const stats = await barberStatisticsRepository.readStats(barberId);
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

export default { browse };
