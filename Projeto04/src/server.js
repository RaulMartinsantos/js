import http from "node:http";
import { jsonHandler } from "./middlewares/jsonHandler.js";
import { routeHandler } from "./middlewares/routeHandler.js";

const server = http.createServer(async (request, response) => {
  await jsonHandler(request, response);
  routeHandler(request, response);
});

server.listen(3333);
