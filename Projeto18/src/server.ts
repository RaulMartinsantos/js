import app from "./app";

const PORT = import.meta.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
