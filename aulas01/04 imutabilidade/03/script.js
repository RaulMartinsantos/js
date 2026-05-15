const book = {
  title: "Objetos imutáveis",
  category: "Javascript",
  author: {
    name: "Raul",
    email: "raul@email.com",
  },
};

function deepFreeze(object) {
  const props = Reflect.ownKeys(object);
  for (const prop of props) {
    const value = object[prop];
    if ((value && typeof value === "object") || typeof value === "function") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

deepFreeze(book);

book.author.name = "HTML";

console.log(book);
