import { Router } from "express";

import { usersRoutes } from "@/routes/user-routes";
import { sessionsRoutes } from "@/routes/session-routes";
import { deliveriesRoutes } from "@/routes/deliveries-routes";

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/deliveries", deliveriesRoutes);

export { routes };
