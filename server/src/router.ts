import express from "express";

const router = express.Router();

import { verifyToken } from "./middleware/verifyToken";
import appointmentActions from "./modules/appointment/appointmentActions";
import barberActions from "./modules/barber/barberActions";
import barberAvailabilityActions from "./modules/barber/barberAvailabilityActions";
import {
  upload as barberUpload,
  uploadAvatar,
} from "./modules/barber/barberAvatarActions";
import barberStatisticsActions from "./modules/barber/barberStatisticsActions";
import customerActions from "./modules/customer/customerActions";
import {
  upload as customerUpload,
  uploadCustomerAvatar,
} from "./modules/customer/customerAvatarActions";
import eventActions from "./modules/event/eventActions";
import prestationActions from "./modules/prestation/prestationActions";
import reviewActions from "./modules/review/reviewActions";
import userActions from "./modules/user/userActions";

router.get(
  "/api/appointments/barber/:id",
  verifyToken,
  appointmentActions.readByBarber,
);
router.get(
  "/api/appointments/user/:id",
  verifyToken,
  appointmentActions.readwithuserid,
);
router.put(
  "/api/appointments/:id/status",
  verifyToken,
  appointmentActions.updateStatus,
);

router.post("/api/appointments", verifyToken, appointmentActions.create);
// --- Les routes Barbier ---
router.get("/api/barbers", barberActions.browse);
router.get("/api/barbers/:id", barberActions.read);
router.get("/api/barbers/:id/statistics", barberStatisticsActions.browse);
router.get("/api/barbers/:id/availability", barberAvailabilityActions.browse);
router.put("/api/barbers/:id/schedule", barberAvailabilityActions.generate);
router.get("/api/barbers/:id/prestations", prestationActions.browseByBarber);
router.put("/api/barbers/:id", barberActions.edit);
router.post(
  "/api/barbers/:id/avatar",
  verifyToken,
  barberUpload.single("avatar"),
  uploadAvatar,
);
router.post(
  "/api/users/:id/avatar",
  verifyToken,
  customerUpload.single("avatar"),
  uploadCustomerAvatar,
);
router.get("/api/customers", customerActions.browse);
router.get("/api/customers/:id", verifyToken, customerActions.read);
router.put("/api/customers/:id", verifyToken, customerActions.edit);
router.get("/api/events", eventActions.browse);

router.get("/api/prestations", prestationActions.browse);
router.post("/api/prestations", verifyToken, prestationActions.add);
router.put("/api/prestations/:id", verifyToken, prestationActions.edit);
router.delete("/api/prestations/:id", verifyToken, prestationActions.destroy);
router.post("/api/reviews", verifyToken, reviewActions.add);
router.delete("/api/reviews/:id", verifyToken, reviewActions.destroy);
router.get("/api/reviews/barber/:id", reviewActions.browseByBarber);
router.get("/api/users", verifyToken, userActions.browse);
router.delete("/api/users/:id", verifyToken, userActions.deleteUser);
router.post("/api/register", userActions.register);
router.post("/api/login", userActions.login);
router.post("/api/forgot-password", userActions.forgotPassword);

export default router;
