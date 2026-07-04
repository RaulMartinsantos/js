import { Router } from "express";
import { ProductController } from "@/controllers/productsController.js";

const productsRoutes = Router();
const productsController = new ProductController();

productsRoutes.get("/", productsController.index);
productsRoutes.post("/", productsController.create);

export { productsRoutes };
