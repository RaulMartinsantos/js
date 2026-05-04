//seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");

//Permite apenas inputs numéricos e já formatado para real
amount.addEventListener("input", () => {
  let value = amount.value.replace(/\D/g, "");

  value = Number(value) / 100;

  amount.value = formatCurrencyBRL(value);
});

//formata moeda para o padrão real
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return value;
}

//Capturando e salvando o evento de input em um objeto
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  expenseAdd(newExpense);
});

//Adiciona os itens na lista
function expenseAdd(newExpense) {
  try {
  } catch (err) {
    alert("Erro tente novamente mais tarde");
    console.log(err);
  }
}
