const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const currency = document.querySelector("#currency");

//Removendo inputs de string com regex
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

form.onsubmit = (event) => {
  event.preventDefault();
  console.log(currency.value);
};
