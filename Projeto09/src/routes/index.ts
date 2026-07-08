import { Router } from "express";

import { ordersRouter } from "./OrdersRoutes.js";
import { tablesRoutes } from "./tablesRoutes.js";
import { productsRoutes } from "./productsRoutes.js";
import { tablesSessionsRoutes } from "./tablesSessionsRoutes.js";

const routes = Router();

routes.use("/tables_sessions", tablesSessionsRoutes);
routes.use("/products", productsRoutes);
routes.use("/tables", tablesRoutes);
routes.use("/orders", ordersRouter);

export { routes };
