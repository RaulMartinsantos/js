import app from "./app";

const PORT = Bun.env.PORT ?? 3333;

app.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`);
});
