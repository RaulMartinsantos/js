import { Router } from "express";
import { TablesSessionsController } from "@/controllers/tablesSessionsController.js";
import { tablesRoutes } from "./tablesRoutes.js";

const tablesSessionsRoutes = Router();
const tablesSessionsController = new TablesSessionsController();

tablesSessionsRoutes.post("/", tablesSessionsController.create);
tablesSessionsRoutes.get("/", tablesSessionsController.index);
tablesSessionsRoutes.patch("/:id", tablesSessionsController.update);

export { tablesSessionsRoutes };
