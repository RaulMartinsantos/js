import { Request, Response } from "express";
import { prisma } from "@/prisma";

class QuestionsController {
  async index(request: Request, response: Response) {
    const questions = await prisma.questions.findMany({
      where: {
        title: {
          contains: request.query.title?.toString().trim(),
          mode: "insensitive",
        },
      },
    });
    return response.json(questions);
  }

  async create(request: Request, response: Response) {
    const { title, content, user_id } = request.body;
    await prisma.questions.create({
      data: { title, content, userID: user_id },
    });
    return response.status(201).json({
      message: `Question title: ${title}, Question: ${content}, from user_id: ${user_id}`,
    });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, content } = request.body;

    await prisma.questions.update({
      data: {
        title,
        content,
      },
      where: {
        id,
      },
    });

    return response.json({ message: "Updated" });
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;
    await prisma.questions.delete({
      where: {
        id,
      },
    });
    return response.json({ message: "deleted!" });
  }
}

export { QuestionsController };
