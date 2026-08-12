import { z, ZodError } from "zod";
import uploadConfig from "@/config/upload";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { DiskStorage } from "@/providers/disk-storage";

class UploadsController {
  async create(req: Request, res: Response) {
    const diskStorage = new DiskStorage();

    try {
      const fileSchema = z
        .object({
          filename: z.string().min(1, "Arquivo é obrigatório"),
          mimetype: z
            .string()
            .refine(
              (type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
              `Formato de imagem não suportado, formatos suportados ${uploadConfig.ACCEPTED_IMAGE_TYPES}`,
            ),
          size: z
            .number()
            .positive()
            .refine(
              (size) => size <= uploadConfig.MAX_FILE_SIZE,
              `Arquivo excede o tamanho máximo de ${uploadConfig.MAX_SIZE}MB`,
            ),
        })
        .passthrough();

      const file = fileSchema.parse(req.file);
      const filename = await diskStorage.saveFile(file.filename);

      return res.json({ filename });
    } catch (err) {
      if (err instanceof ZodError) {
        if (req.file) {
          await diskStorage.deleteFile(req.file.filename, "tmp");
        }

        throw new AppError(err.issues[0].message)
      }
      throw err;
    }
  }
}

export { UploadsController };
