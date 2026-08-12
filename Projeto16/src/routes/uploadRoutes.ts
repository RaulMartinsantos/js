import multer from "multer";
import Router from "express";
import uploadConfig from "@/config/upload";
import { UploadsController } from "@/controllers/upload-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const uploadRoutes = Router();
const uploadController = new UploadsController();

const upload = multer(uploadConfig.MULTER);

uploadRoutes.post(
  "/",
  verifyUserAuthorization(["employee"]),
  upload.single("file"),
  uploadController.create,
);

export { uploadRoutes };
