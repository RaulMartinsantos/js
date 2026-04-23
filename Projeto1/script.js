//cotação das moedas
const USD = 4.98;
const EUR = 5.82;
const GBP = 6.71;

const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const currency = document.querySelector("#currency");
const footer = document.querySelector("main footer");
const description = document.querySelector("#description");
const result = document.querySelector("#result");

//removendo inputs de string com regex
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

//capturando e alterando o tipo de moeda para a função que converte os valores
form.onsubmit = (event) => {
  event.preventDefault();

  if (amount.value > 0) {
    switch (currency.value) {
      case "USD":
        convertCurrency(Number(amount.value), USD, "US$");
        break;
      case "EUR":
        convertCurrency(Number(amount.value), EUR, "€");
        break;
      case "GBP":
        convertCurrency(Number(amount.value), GBP, "£");
        break;
    }
  } else {
    return alert("Digite um numero maior que zero");
  }
};

//função que converte os valores
function convertCurrency(amount, price, symbol) {
  try {
    //exibe a cotação da moeda selecionada no footer
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    //calcula e formata a conversão
    let total = amount * price;
    total = formatCurrencyBRL(total).replace("R$", "");

    //troca o valor do campo de resultado
    result.textContent = `${total} Reais`;

    //aplica a classe que exibe o footer com o resultado
    footer.classList.add("show-result");
  } catch (error) {
    //caso de erro remove a classe e falha seguro
    footer.classList.remove("show-result");

    console.log(error);
    alert("Não foi possível converter tente novamente mais tarde");
  }
}

//função para converter moeda para BRL
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
