import type { RequestHandler } from "express";
import notificationRepository from "../notification/notificationRepository";
import appointmentRepository from "./appointmentRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const appointments = await appointmentRepository.readAll({
      startDate: typeof startDate === "string" ? startDate : undefined,
      endDate: typeof endDate === "string" ? endDate : undefined,
    });
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

const browseforadmin: RequestHandler = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const appointments = await appointmentRepository.readAllForAdmin({
      startDate: typeof startDate === "string" ? startDate : undefined,
      endDate: typeof endDate === "string" ? endDate : undefined,
    });
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

const readwithuserid: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const appointment = await appointmentRepository.readwithuserid(id);
    res.json(appointment);
  } catch (err) {
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

    if (status === "annulé") {
      const appt = await appointmentRepository.readById(id);
      if (appt) {
        const date = new Date(appt.appointment_date).toLocaleDateString(
          "fr-FR",
          { day: "numeric", month: "long", year: "numeric" },
        );
        await notificationRepository.create(
          appt.id_user_customer,
          `Votre rendez-vous du ${date} avec ${appt.barber_name} (${appt.prestation_name}) a été annulé.`,
          "annulation",
          id,
        );
      }
    }

    await appointmentRepository.updateStatus(id, status);
    res.json({ success: true });
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
};
