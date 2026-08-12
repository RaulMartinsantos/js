import { Router } from "express";
import { RefundController } from "@/controllers/refund-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const refundsRoutes = Router();
const refundsController = new RefundController();

refundsRoutes.get(
  "/",
  verifyUserAuthorization(["manager"]),
  refundsController.index,
);

refundsRoutes.get(
  "/:id",
  verifyUserAuthorization(["manager", "employee"]),
  refundsController.show,
);

refundsRoutes.post(
  "/",
  verifyUserAuthorization(["employee"]),
  refundsController.create,
);

export { refundsRoutes };
