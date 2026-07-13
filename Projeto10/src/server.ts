import http from "node:http";
const PORT = 3333;

const server = http.createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/") {
    return response.end("Hello world");
  }

  if (request.method === "POST" && request.url=== "/") {
    return response.writeHead(201).end({ message : "test" })
  }

  return response.writeHead(400).end("not found");
});

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
