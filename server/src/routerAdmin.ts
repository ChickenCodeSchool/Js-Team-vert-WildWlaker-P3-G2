import express from "express";

const routerAdmin = express.Router();

import { verifyAdmin } from "./middleware/verifyAdmin";
import { verifyToken } from "./middleware/verifyToken";
import adminDashboardAction from "./modules/adminDashboard/adminDashboardAction";
import appointmentActions from "./modules/appointment/appointmentActions";
import barberActions from "./modules/barber/barberActions";
import customerActions from "./modules/customer/customerActions";
import eventActions from "./modules/event/eventActions";
import { uploadEventImage } from "./modules/event/eventUpload";
import reviewActions from "./modules/review/reviewActions";
import userActions from "./modules/user/userActions";

routerAdmin.use(verifyToken, verifyAdmin);

routerAdmin.get("/api/admin/dashboard", adminDashboardAction.browse);
routerAdmin.get(
  "/api/admin/appointmentsdetails",
  appointmentActions.browseforadmin,
);
routerAdmin.get("/api/admin/appointments", appointmentActions.browse);
routerAdmin.get("/api/admin/barbers", barberActions.browse);
routerAdmin.put("/api/admin/barbers/:id", barberActions.edit);
routerAdmin.delete("/api/admin/users/:id", userActions.deleteUser);
routerAdmin.post(
  "/api/admin/events",
  uploadEventImage.single("image"),
  eventActions.add,
);
routerAdmin.put(
  "/api/admin/events/:id",
  uploadEventImage.single("image"),
  eventActions.edit,
);
routerAdmin.delete("/api/admin/events/:id", eventActions.destroy);
routerAdmin.get("/api/admin/customers", customerActions.browse);
routerAdmin.put("/api/admin/customers/:id", customerActions.edit);
routerAdmin.get("/api/admin/reviews", reviewActions.browse);
routerAdmin.delete("/api/admin/reviews/:id", reviewActions.destroy);
routerAdmin.get("/api/admin/reviewsdetails", reviewActions.browseforadmin);

export default routerAdmin;
