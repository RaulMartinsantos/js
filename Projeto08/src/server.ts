import express, { Request, Response } from "express";
import { PORT } from "./port.js";

const app = express();
app.use(express.json());

app.get("/", async (request: Request, response: Response) => {
  response.json({ message: "Hello world" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
