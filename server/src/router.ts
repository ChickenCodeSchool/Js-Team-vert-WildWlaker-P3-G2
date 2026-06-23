import express from "express";

const router = express.Router();

import adminDashboardAction from "./modules/adminDashboard/adminDashboardAction";
import appointmentActions from "./modules/appointment/appointmentActions";
import availabilityActions from "./modules/availability/availabilityActions";
import barberActions from "./modules/barber/barberActions";
import { upload, uploadAvatar } from "./modules/barber/barberAvatarActions";
import barberStatisticsActions from "./modules/barber/barberStatisticsActions";
import customerActions from "./modules/customer/customerActions";
import eventActions from "./modules/event/eventActions";
import notificationActions from "./modules/notification/notificationActions";
import prestationActions from "./modules/prestation/prestationActions";
import reviewActions from "./modules/review/reviewActions";
import userActions from "./modules/user/userActions";

router.get("/api/admin-dashboard", adminDashboardAction.browse);
router.get("/api/appointments", appointmentActions.browse);
router.get("/api/appointments/admin", appointmentActions.browseforadmin);
router.get("/api/appointments/barber/:id", appointmentActions.readByBarber);
router.get("/api/appointments/user/:id", appointmentActions.readwithuserid);
router.put("/api/appointments/:id/status", appointmentActions.updateStatus);
router.get("/api/barbers", barberActions.browse);
router.get("/api/barbers/:id/statistics", barberStatisticsActions.browse);
router.put("/api/barbers/:id", barberActions.edit);
router.post("/api/barbers/:id/avatar", upload.single("avatar"), uploadAvatar);
router.get("/api/barbers/:id/availability", availabilityActions.getByDate);
router.post("/api/barbers/:id/availability", availabilityActions.saveSchedule);
router.get("/api/customers", customerActions.browse);
router.get("/api/customers/:id", customerActions.read);
router.put("/api/customers/:id", customerActions.edit);
router.get("/api/events", eventActions.browse);
router.get("/api/prestations", prestationActions.browse);
router.post("/api/prestations", prestationActions.add);
router.put("/api/prestations/:id", prestationActions.edit);
router.delete("/api/prestations/:id", prestationActions.destroy);
router.delete("/api/reviews/:id", reviewActions.destroy);
router.get("/api/reviews", reviewActions.browse);
router.get("/api/reviews/admin", reviewActions.browseforadmin);
router.get("/api/users", userActions.browse);
router.delete("/api/users/:id", userActions.deleteUser);
router.get("/api/notifications/:userId", notificationActions.readByUser);
router.put("/api/notifications/:id/read", notificationActions.markRead);
router.put(
  "/api/notifications/user/:userId/read-all",
  notificationActions.markAllRead,
);

export default router;
