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

const create: RequestHandler = async (req, res, next) => {
  console.log("BODY =", req.body);
  console.log("USER =", req.user);
  try {
    const { appointment_date, location_type, id_prestation, id_user_barber } =
      req.body;
    const userId = Number(req.user?.id);

    if (Number.isNaN(userId)) {
      return res.sendStatus(403);
    }

    await appointmentRepository.create({
      appointment_date,
      location_type,
      id_prestation,
      id_user_barber,
      id_user_customer: userId,
    });

    res.status(201).json({
      message: "Rendez-vous créé avec succès",
    });
  } catch (err) {
    next(err);
  }
};
const readMyAppointments: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.user?.id);
    console.log("USER ID UTILISÉ POUR LA REQUÊTE :", userId);
    if (Number.isNaN(userId)) {
      return res.sendStatus(403);
    }
    const appointments = await appointmentRepository.readwithuserid(userId);
    console.log("RÉSULTAT SQL :", appointments);
    res.status(200).json(appointments);
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
  create,
  readMyAppointments,
};
