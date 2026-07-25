import { Router } from "express";

import { usersRoutes } from "@/routes/user-routes";
import { sessionsRoutes } from "@/routes/session-routes";
import { deliveriesRoutes } from "@/routes/deliveries-routes";
import { deliveryLogsRoutes } from "@/routes/delivery-routes-logs";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/deliveries", deliveriesRoutes);
routes.use("/delivery-logs", deliveryLogsRoutes);

export { routes };
