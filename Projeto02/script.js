//seleciona os elementos do formulário

const amount = document.querySelector("#amount");

amount.addEventListener("input", () => {
  let value = amount.value.replace(/\D/g, "");
  amount.value = value;
});
