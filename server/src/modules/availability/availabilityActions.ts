import type { RequestHandler } from "express";
import availabilityRepository from "./availabilityRepository";

const getByDate: RequestHandler = async (req, res, next) => {
  try {
    const barberId = Number(req.params.id);
    const date = typeof req.query.date === "string" ? req.query.date : "";
    if (!date) {
      res.status(400).json({ error: "date query param required (YYYY-MM-DD)" });
      return;
    }
    const slots = await availabilityRepository.getByBarberAndDate(
      barberId,
      date,
    );
    res.json(slots);
  } catch (err) {
    next(err);
  }
};

const saveSchedule: RequestHandler = async (req, res, next) => {
  try {
    const barberId = Number(req.params.id);
    const { schedule } = req.body as { schedule: unknown[] };
    if (!Array.isArray(schedule)) {
      res.status(400).json({ error: "schedule must be an array" });
      return;
    }
    await availabilityRepository.saveWeeklySchedule(
      barberId,
      schedule as Parameters<
        typeof availabilityRepository.saveWeeklySchedule
      >[1],
    );
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export default { getByDate, saveSchedule };
