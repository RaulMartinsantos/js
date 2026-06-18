import { Router } from "express";
import { myMiddleware } from "../middlewares/my-middleware.js";
import { ProductsController } from "../controllers/ProductsController.js";

const productsController = new ProductsController();

const productsRoutes = Router();

productsRoutes.get("/:id", productsController.index);

productsRoutes.post("/", myMiddleware, productsController.create);

export { productsRoutes };
