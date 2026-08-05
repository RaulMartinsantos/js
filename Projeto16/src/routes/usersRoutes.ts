import { Router } from "express";
import { UsersController } from "@/controllers/user-controller";

const userRoutes = Router();
const userController = new UsersController();

userRoutes.post("/", userController.create);

export { userRoutes };
