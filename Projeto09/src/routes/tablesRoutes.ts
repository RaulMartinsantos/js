import { Router } from "express";
import { TablesController } from "@/controllers/tablesController.js";

const tablesRoutes = Router();
const tablesController = new TablesController();

tablesRoutes.get("/", tablesController.index);

export { tablesRoutes };
