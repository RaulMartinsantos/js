let execute = true;

while (execute === true) {
  let response = window.prompt("deseja continuar 1(_)Sim 2(_)Não");

  if (response === "2") {
    execute = false;
  }
}
