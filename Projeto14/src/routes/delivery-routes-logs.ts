import { Router } from "express";
import { ensureAuth } from "@/middlewares/ensure-Authenticated";
import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveryLogsRoutes = Router();
const deliveriesLogsControllers = new DeliveryLogsController();

deliveryLogsRoutes.use(ensureAuth);

deliveryLogsRoutes.post(
  "/",
  verifyUserAuthorization(["sale"]),
  deliveriesLogsControllers.create,
);

export { deliveryLogsRoutes };
