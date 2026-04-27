let person = {
  name: "Raul",
  sobrenome: "Santos",
  email: "raul@email.com",
};

for (let p in person) {
  console.log(p);
  console.log(person[p]);
}

let students = ["Rodrigo", "João", "Amanda"];

for (let i in students) {
  console.log(i);
}
