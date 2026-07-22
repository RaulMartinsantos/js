import express from "express";
import "express-async-errors";

import { routes } from "@/routes/index";
import { errorHandling } from "@/middlewares/error-Handling";

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandling);

export { app };
