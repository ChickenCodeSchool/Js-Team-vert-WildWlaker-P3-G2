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
const ALLOWED_STATUSES = ["pending", "confirmed", "completed", "cancelled"];
const updateStatus: RequestHandler = async (req, res, next) => {
  try {
    const appointmentId = Number(req.params.id);
    const { status } = req.body as { status: string };
    const userId = Number(req.user?.id);
    const userRole = req.user?.role;
    if (Number.isNaN(appointmentId) || Number.isNaN(userId)) {
      return res.sendStatus(403);
    }
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Statut invalide" });
    }
    const appointment = await appointmentRepository.readById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Rendez-vous introuvable" });
    }

    const isOwner = appointment.id_user_customer === userId;
    const isBarber = appointment.id_user_barber === userId;
    const isAdmin = userRole === "admin";
    if (!isOwner && !isBarber && !isAdmin) {
      return res.sendStatus(403);
    }
    if (isOwner && !isBarber && !isAdmin && status !== "cancelled") {
      return res.sendStatus(403);
    }

    await appointmentRepository.updateStatus(appointmentId, status);
    res.status(200).json({ message: "Statut mis à jour" });
  } catch (err) {
    next(err);
  }
};

const create: RequestHandler = async (req, res, next) => {
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
    if (Number.isNaN(userId)) {
      return res.sendStatus(403);
    }
    const appointments = await appointmentRepository.readwithuserid(userId);
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
