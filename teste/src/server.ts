import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

app.get("/", async function handler(request, reply) {
  return { message: "Hello world" };
});

try {
  await app.listen({ port: 3333 });
  console.log("App listen on port 3333");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
