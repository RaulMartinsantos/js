const address1 = {
  street: "Av, Brasil",
  number: 20,
};

const address2 = { ...address1 };
address2.number = 30;

console.log(address1, address2);

const list1 = ["Abacate", "Uva", "sabonete"];

const list2 = [...list1];

list2.push("Pintão largo");

console.log(list1, list2);
