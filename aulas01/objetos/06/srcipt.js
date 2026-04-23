function createProduct(name) {
  const product = {};
  product.name = name;

  product.details = () => {
    console.log(`O nome do produto é ${product.name}`);
  };
  return product;
}

const product1 = new createProduct("Teclado");

console.log(product1.name);
product1.details?.();

const product2 = new createProduct("Monitor");
console.log(product2.name);
product2.details?.();

function person(name) {
  this.name = name;
  this.menssage = function () {
    console.log(`Olá ${this.name}!`);
  };
}

const person1 = new person("Raul");
console.log(person1.name);
person1.menssage();

const person2 = new person("Larissa");
console.log(person2.name);
person2.menssage();