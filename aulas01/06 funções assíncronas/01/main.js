function asyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = true;

      if (isSuccess) {
        resolve("A operação foi concluída com sucesso");
      } else {
        reject("Algo deu errado");
      }
    }, 3000);
  });
}

console.log("Executando");

asyncFunction()
  .then((response) => {
    console.log("Sucesso!");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => {
      console.log("Fim da execução");
    }, 1000);
  });
