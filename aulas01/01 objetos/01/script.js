const obj = {};
console.log(typeof obj);

const usr = {
  email: "raul@email.com",
  age: 18,
  name: {
    first_name: "Raul",
    last_name: "Santos",
  },

  address: {
    street: "Rua exemplo",
    number: 12,
    city: "São Paulo",
    postal_code: "12345_678",
  },
  message: () => {
    console.log(`Olá ${usr.name.first_name}!`);
  },
};

console.log(usr.name.first_name);

usr.message();

console.log(usr["email"]);
console.log(usr["name"]["last_name"]);
usr["message"]();
