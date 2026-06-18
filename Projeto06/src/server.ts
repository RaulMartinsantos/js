import express, { Response, Request, NextFunction } from "express";
import { routes } from "./routes/index.js";
import { AppError } from "./utils/AppError.js";
import { ZodError } from "zod";

const PORT = 3333;

const app = express();
app.use(express.json());

app.use(routes);

app.use((err: any, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return response
      .status(400)
      .json({ message: "Validation error", issues: err.format() });
  }

  response.json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
