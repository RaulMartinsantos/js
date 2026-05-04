//seleciona os elementos do formulário
const amount = document.querySelector("#amount");

//Permite apenas inputs numéricos e já formatado para real
amount.addEventListener("input", () => {
  let value = amount.value.replace(/\D/g, "");

  value = Number(value) / 100;

  amount.value = formatCurrencyBRL(value);
});

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return value;
}
