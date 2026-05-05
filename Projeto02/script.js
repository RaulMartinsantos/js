//seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");

//seleciona os elementos da lista
const expenseList = document.querySelector("ul");

//permite apenas inputs numéricos e já formatado para real
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

//capturando e salvando o evento de input em um objeto
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

//adiciona os itens na lista
function expenseAdd(newExpense) {
  try {
    //estrutura de criação no html

    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    const divwraper = document.createElement("div");
    divwraper.classList.add("expense-info");

    const expenseName = document.createElement("strong");
    expenseName.innerHTML = expense.value;

    const expenseType = document.createElement("span");
    expenseType.textContent = newExpense.category_name;

    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${amount.value.replace("R$", "")}`;
    console.log(expense.value);

    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "/img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    //adiciona na ul

    expenseList.append(expenseItem);
    expenseItem.append(expenseIcon);
    expenseItem.append(divwraper);
    divwraper.append(expenseName);
    divwraper.append(expenseType);
    expenseItem.append(expenseAmount);
    expenseItem.append(removeIcon);
  } catch (err) {
    alert("Erro tente novamente mais tarde");
    console.log(err);
  }
}
