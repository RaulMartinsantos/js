//seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");

//seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header h2");
const expensesTotal = document.querySelector("aside header p span");

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

    const divWrapper = document.createElement("div");
    divWrapper.classList.add("expense-info");

    const expenseName = document.createElement("strong");
    expenseName.innerHTML = expense.value;

    const expenseType = document.createElement("span");
    expenseType.textContent = newExpense.category_name;

    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${amount.value.replace("R$", "")}`;

    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "/img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    //adiciona na ul

    expenseList.append(expenseItem);
    expenseItem.append(expenseIcon);
    expenseItem.append(divWrapper);
    divWrapper.append(expenseName);
    divWrapper.append(expenseType);
    expenseItem.append(expenseAmount);
    expenseItem.append(removeIcon);

    totalUpdate();
  } catch (err) {
    alert("Erro tente novamente mais tarde");
    console.log(err);
  }
}

//Atualiza os totais

function totalUpdate() {
  try {
    const items = expenseList.children;
    expensesTotal.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      const itemAmount = items[i].querySelector(".expense-amount");

      let value = itemAmount.textContent.replace(/[^\d]/g, "");
      value = parseFloat(value);

      if (isNaN(value)) {
        return alert("Não foi possível calcular o total");
      }
      total += Number(value);
    }

    expensesQuantity.innerHTML = `<small>R$</small> ${formatCurrencyBRL(
      total / 100,
    ).replace("R$", "")}`;
  } catch (err) {
    console.log(err);
    alert("Não foi possível atualizar os totais");
  }
}

//remove a li da despesa

expenseList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-icon")) {
    const li = event.target.closest("li");
    li.remove();
    totalUpdate();
  }
});
