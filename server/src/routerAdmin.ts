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

routerAdmin.get(
  "/api/admin/dashboard",
  verifyToken,
  verifyAdmin,
  adminDashboardAction.browse,
);
routerAdmin.get(
  "/api/admin/appointmentsdetails",
  verifyToken,
  verifyAdmin,
  appointmentActions.browseforadmin,
);
routerAdmin.get(
  "/api/admin/appointments",
  verifyToken,
  verifyAdmin,
  appointmentActions.browse,
);
routerAdmin.get(
  "/api/admin/barbers",
  verifyToken,
  verifyAdmin,
  barberActions.browse,
);
routerAdmin.put(
  "/api/admin/barbers/:id",
  verifyToken,
  verifyAdmin,
  barberActions.edit,
);
routerAdmin.delete(
  "/api/admin/users/:id",
  verifyToken,
  verifyAdmin,
  userActions.deleteUser,
);
routerAdmin.post(
  "/api/admin/events",
  verifyToken,
  verifyAdmin,
  uploadEventImage.single("image"),
  eventActions.add,
);
routerAdmin.put(
  "/api/admin/events/:id",
  verifyToken,
  verifyAdmin,
  uploadEventImage.single("image"),
  eventActions.edit,
);
routerAdmin.delete(
  "/api/admin/events/:id",
  verifyToken,
  verifyAdmin,
  eventActions.destroy,
);
routerAdmin.get(
  "/api/admin/customers",
  verifyToken,
  verifyAdmin,
  customerActions.browse,
);
routerAdmin.put(
  "/api/admin/customers/:id",
  verifyToken,
  verifyAdmin,
  customerActions.edit,
);
routerAdmin.get(
  "/api/admin/reviews",
  verifyToken,
  verifyAdmin,
  reviewActions.browse,
);
routerAdmin.delete(
  "/api/admin/reviews/:id",
  verifyToken,
  verifyAdmin,
  reviewActions.destroy,
);
routerAdmin.get(
  "/api/admin/reviewsdetails",
  verifyToken,
  verifyAdmin,
  reviewActions.browseforadmin,
);

export default routerAdmin;
