import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import appointmentActions from "./modules/appointment/appointmentActions";
import barberActions from "./modules/barber/barberActions";
import customerActions from "./modules/customer/customerActions";
import eventActions from "./modules/event/eventActions";
import prestationActions from "./modules/prestation/prestationActions";
import reviewActions from "./modules/review/reviewActions";
import userActions from "./modules/user/userActions";

router.get("/api/appointments", appointmentActions.browse);
router.get("/api/barbers", barberActions.browse);
router.get("/api/customers", customerActions.browse);
router.get("/api/events", eventActions.browse);
router.get("/api/prestations", prestationActions.browse);
router.get("/api/users", userActions.browse);
router.get("/api/reviews", reviewActions.browse);

/* ************************************************************************* */

export default router;
