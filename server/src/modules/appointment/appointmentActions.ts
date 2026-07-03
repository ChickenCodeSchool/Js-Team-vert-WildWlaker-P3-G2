import type { RequestHandler } from "express";

// Import access to data
import appointmentRepository from "./appointmentRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all appointements
    const { startDate, endDate } = req.query;
    const appointments = await appointmentRepository.readAll({
      startDate: typeof startDate === "string" ? startDate : undefined,
      endDate: typeof endDate === "string" ? endDate : undefined,
    });

    // Respond with the appointments in JSON format
    res.json(appointments);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const browseforadmin: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all appointements
    const { startDate, endDate } = req.query;
    const appointments = await appointmentRepository.readAllForAdmin({
      startDate: typeof startDate === "string" ? startDate : undefined,
      endDate: typeof endDate === "string" ? endDate : undefined,
    });

    // Respond with the appointments in JSON format
    res.json(appointments);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const readwithuserid: RequestHandler = async (req, res, next) => {
  try {
    if (req.user?.id !== Number(req.params.id)) {
      return res.sendStatus(403);
    }
    const id = Number(req.params.id);
    const appointment = await appointmentRepository.readwithuserid(id);
    res.json(appointment);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readByBarber: RequestHandler = async (req, res, next) => {
  try {
    const barberId = Number(req.params.id);
    const status =
      typeof req.query.status === "string" ? req.query.status : undefined;
    const appointments = await appointmentRepository.readByBarber(
      barberId,
      status,
    );
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

const updateStatus: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body as { status: string };
    await appointmentRepository.updateStatus(id, status);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { appointment_date, id_prestation, id_user_barber, id_user_customer, location_type } = req.body;

    if (!appointment_date || !id_prestation || !id_user_barber || !id_user_customer) {
      res.status(400).json({ message: "Données manquantes pour créer le rendez-vous" });
      return;
    }

    const result = await appointmentRepository.create({
      appointment_date,
      id_prestation: Number(id_prestation),
      id_user_barber: Number(id_user_barber),
      id_user_customer: Number(id_user_customer),
      location_type: location_type ?? "domicile",
    });

    res.status(201).json({ message: "Rendez-vous créé", id: (result as { insertId: number }).insertId });
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  browseforadmin,
  readwithuserid,
  readByBarber,
  updateStatus,
  add,
};
