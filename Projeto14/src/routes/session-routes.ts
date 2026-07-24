import { Router } from "express";
import { SessionController } from "@/controllers/sessions-controller";

const sessionsRoutes = Router();
const sessionsController = new SessionController();

sessionsRoutes.post("/", sessionsController.create);

export { sessionsRoutes };
