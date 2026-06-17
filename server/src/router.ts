import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import adminDashboardAction from "./modules/adminDashboard/adminDashboardAction";
import appointmentActions from "./modules/appointment/appointmentActions";
import barberActions from "./modules/barber/barberActions";
import barberStatisticsActions from "./modules/barber/barberStatisticsActions";
import customerActions from "./modules/customer/customerActions";
import eventActions from "./modules/event/eventActions";
import prestationActions from "./modules/prestation/prestationActions";
import reviewActions from "./modules/review/reviewActions";
import userActions from "./modules/user/userActions";

router.get("/api/admin-dashboard", adminDashboardAction.browse);
router.get("/api/appointments", appointmentActions.browse);
router.get("/api/appointments/admin", appointmentActions.browseforadmin);
router.get("/api/appointments/user/:id", appointmentActions.readwithuserid);
router.get("/api/barbers", barberActions.browse);
router.get("/api/barbers/:id/statistics", barberStatisticsActions.browse);
router.put("/api/barbers/:id", barberActions.edit);
router.get("/api/customers", customerActions.browse);
router.get("/api/customers/:id", customerActions.read);
router.put("/api/customers/:id", customerActions.edit);
router.get("/api/events", eventActions.browse);
router.get("/api/prestations", prestationActions.browse);
router.post("/api/prestations", prestationActions.add);
router.put("/api/prestations/:id", prestationActions.edit);
router.delete("/api/prestations/:id", prestationActions.destroy);
router.get("/api/reviews", reviewActions.browse);
router.get("/api/users", userActions.browse);
router.delete("/api/users/:id", userActions.deleteUser);

/* ************************************************************************* */

export default router;
