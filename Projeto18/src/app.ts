import router from "./routes";
import express, { type Response, type Request } from "express";

const app = express();

app.use(express.json());
app.use(router);

export default app;
