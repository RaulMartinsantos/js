import { Router } from "express";
import { ensureAuth } from "@/middlewares/ensure-Authenticated";
import { DeliveriesController } from "@/controllers/deliveries-controller";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { DeliveriesStatusController } from "@/controllers/deliveries-status-controller";

const deliveriesRoutes = Router();
const deliveriesControllers = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController();

deliveriesRoutes.use(ensureAuth);

deliveriesRoutes.get("/", deliveriesControllers.index);

deliveriesRoutes.post(
  "/",
  verifyUserAuthorization(["sale"]),
  deliveriesControllers.create,
);

deliveriesRoutes.put("/:id/status", deliveriesStatusController.update);

export { deliveriesRoutes };
