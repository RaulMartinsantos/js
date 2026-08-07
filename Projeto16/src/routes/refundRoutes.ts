import { Router } from "express";
import { RefundController } from "@/controllers/refund-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const refundsRoutes = Router();
const refundsController = new RefundController();

refundsRoutes.post(
  "/",
  verifyUserAuthorization(["employee"]),
  refundsController.create,
);

export { refundsRoutes };
