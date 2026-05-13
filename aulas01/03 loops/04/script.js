let students = ["Rodrigo", "Amanda", "João"];

for (let student of students) {
  console.log(student);
}
let usrs = [
  {
    name: "Raul",
    sobrenome: "Santos",
    email: "raul@email.com",
  },
];

for (let usr of usrs) {
  console.log(usr);
}

let numbers = [1, 2, 3, 4];

let samengo = 5;

const comparador = numbers.find((number) => number === samengo);

if (comparador !== undefined) {
  console.log("esse numero já existe");
} else {
  numbers.push(samengo);
  console.log(numbers);
}
