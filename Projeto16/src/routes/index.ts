import { Router } from "express";
import { userRoutes } from "@/routes/usersRoutes";
import { refundsRoutes } from "@/routes/refundRoutes";
import { sessionsRoutes } from "@/routes/sessionRoutes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";


const routes = Router();

//Rotas públicas
routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoutes);

//Rotas privadas
routes.use(ensureAuthenticated);
routes.use("/refunds", refundsRoutes);

export { routes };
