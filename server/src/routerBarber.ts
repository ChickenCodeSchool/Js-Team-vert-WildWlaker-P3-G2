import express from "express";

const routerBarber = express.Router();

import { verifyBarber } from "./middleware/verifyBarber";
import { verifyToken } from "./middleware/verifyToken";
import appointmentActions from "./modules/appointment/appointmentActions";
import barberActions from "./modules/barber/barberActions";
import barberAvailabilityActions from "./modules/barber/barberAvailabilityActions";
import {
  upload as barberUpload,
  uploadAvatar,
} from "./modules/barber/barberAvatarActions";
import barberStatisticsActions from "./modules/barber/barberStatisticsActions";
import prestationActions from "./modules/prestation/prestationActions";

routerBarber.use(verifyToken, verifyBarber);
routerBarber.post("/prestations", prestationActions.add);
routerBarber.put("/prestations/:id", prestationActions.edit);
routerBarber.delete("/prestations/:id", prestationActions.destroy);
routerBarber.put("/:id", barberActions.edit);
routerBarber.post("/:id/avatar", barberUpload.single("avatar"), uploadAvatar);
routerBarber.put("/:id/schedule", barberAvailabilityActions.generate);
routerBarber.get("/:id/appointments", appointmentActions.readByBarber);
routerBarber.put("/appointments/:id/status", appointmentActions.updateStatus);
routerBarber.get("/:id/statistics", barberStatisticsActions.browse);
export default routerBarber;
