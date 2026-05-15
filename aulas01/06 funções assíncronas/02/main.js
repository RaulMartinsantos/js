function asyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = false;

      if (isSuccess) {
        resolve("A operação foi concluída com sucesso");
      } else {
        reject("Algo deu errado");
      }
    }, 3000);
  });
}

console.log("Executando");

async function fetch() {
  try {
    const response = await asyncFunction();
    console.log("Sucesso");
  } catch (err) {
    console.log(err);
  } finally {
    setTimeout(() => {
      console.log("Finalizado");
    }, 1000);
  }
}

fetch();
