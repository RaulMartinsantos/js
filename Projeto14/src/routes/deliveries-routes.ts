import { Router } from "express";
import { ensureAuth } from "@/middlewares/ensure-Authenticated";
import { DeliversController } from "@/controllers/deliveries-controller";

const deliveriesRoutes = Router();
const deliveriesControllers = new DeliversController();

deliveriesRoutes.use(ensureAuth);
deliveriesRoutes.post("/", deliveriesControllers.create);

export { deliveriesRoutes };
