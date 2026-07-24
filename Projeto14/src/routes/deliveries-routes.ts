import { Router } from "express";
import { ensureAuth } from "@/middlewares/ensure-Authenticated";
import { DeliversController } from "@/controllers/deliveries-controller";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveriesRoutes = Router();
const deliveriesControllers = new DeliversController();

deliveriesRoutes.use(ensureAuth, verifyUserAuthorization(["sale"]));
deliveriesRoutes.post("/", deliveriesControllers.create);

export { deliveriesRoutes };
