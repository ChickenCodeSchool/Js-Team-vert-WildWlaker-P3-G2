import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import barberActions from "./modules/barber/barberActions";
import prestationActions from "./modules/prestation/prestationActions";
import eventActions from "./modules/event/eventActions";

router.get("/api/barbers", barberActions.browse);
router.get("/api/prestations", prestationActions.browse);
router.get("/api/events", eventActions.browse);

/* ************************************************************************* */

export default router;
