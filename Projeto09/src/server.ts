import express from "express";
import { PORT } from "./port.js";
import { routes } from "./routes/index.js";
import { errorHandling } from "./middleware/errorHandling.js";

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
