import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import appointementActions from "./modules/appointement/appointementActions";
// Define item-related routes
import barberActions from "./modules/barber/barberActions";
import customerActions from "./modules/customer/customerActions";
import eventActions from "./modules/event/eventActions";
import prestationActions from "./modules/prestation/prestationActions";
import userActions from "./modules/user/userActions";

router.get("/api/appointements", appointementActions.browse);
router.get("/api/barbers", barberActions.browse);
router.get("/api/customers", customerActions.browse);
router.get("/api/events", eventActions.browse);
router.get("/api/prestations", prestationActions.browse);
router.get("/api/users", userActions.browse);

/* ************************************************************************* */

export default router;
