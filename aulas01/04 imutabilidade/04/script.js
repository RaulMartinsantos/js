/* const book = {
  title: "Objetos imutáveis",
  category: "Javascript",
  author: {
    name: "Raul",
    email: "raul@email.com",
  },
};

const updatedBook = {
  ...book,
  title: "Objetos mutáveis",
  category: "HTML",
  author: { ...book.author },
  author: "João",
};

const { author, ...updatedBook2 } = book;

console.log(book, updatedBook, updatedBook2);
*/

const tarefas = [
  { titulo: "Estudar JS", concluída: false },
  { titulo: "Treinar", concluída: true },
  { titulo: "Ler", concluída: false },
];

for (let i = 0; i < tarefas.length; i++) {
  console.log(tarefas[i].titulo);
}

for (let i = 0; i < tarefas.length; i++) {
  if (tarefas[i].concluída) {
    console.log(`Tarefa ${tarefas[i].titulo} concluída`);
  }
}

let faltam = 0;

for (let i = 0; i < tarefas.length; i++) {
  if (!tarefas[i].concluída) {
    faltam++;
  }
}
console.log(`Faltam ${faltam} tarefas para concluir`);

for (let i = 0; i < tarefas.length; i++) {
  const li = document.createElement("li");
  li.textContent = tarefas[i].titulo;
  document.body.appendChild(li);
}

for (let i = 0; i < tarefas.length; i++) {
  if (!tarefas[i].concluída) {
    tarefas[i].concluída = true;
  }
}

console.log(tarefas);
