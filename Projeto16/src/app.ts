import cors from "cors";
import { z } from "zod";
import express from "express";
import { AppError } from "@/utils/AppError";
import { errorHandling } from "@/middlewares/error-handling";

const app = express();

app.use(cors());
app.use(express.json());



app.use(errorHandling);

export { app };
