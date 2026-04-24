const product = {
  name: "Teclado",
  quantity: 100,
};

console.log(product.quantity);
product.quantity = 90;
console.log(product.quantity);

console.log(product.name);
product.name = "Mouse";
console.log(product.name);

product["quantity"] = 50;
console.log(product);
