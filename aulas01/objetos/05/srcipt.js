let content = "Olá";

console.log(content ?? "Conteudo padrão");

const user = {
  name: "Raul",
  address: {
    postal_code: "12345_123",
  },
};

console.log(user.address.postal_code ?? "Adicione seu codigo postal");
