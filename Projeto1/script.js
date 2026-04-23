//cotação das moedas
const USD = 4.98;
const EUR = 5.82;
const GBP = 6.71;

const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const currency = document.querySelector("#currency");
const footer = document.querySelector("main footer");

//removendo inputs de string com regex
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

//capturando e alterando o tipo de modeda para a função que converte os valores
form.onsubmit = (event) => {
  event.preventDefault();
  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

//função que converte os valores
function convertCurrency(amount, price, symbol) {
  try {
    //aplica a classe que exibe o footer com o resultado
    footer.classList.add("show-result");
  } catch (error) {
    //caso de erro remove a classe e falha seguro
    footer.classList.remove("show-result");

    console.log(error);
    alert("Não foi possivel converter tente novamente mais tarde");
  }
}
