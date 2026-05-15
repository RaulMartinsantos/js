import { calc } from "./calc.js";

const newCalc = new calc();

console.log(`4 + 6 = ${newCalc.sum(4, 6)}`);

console.log(`6 x 9 = ${newCalc.multiply(6, 9)}`);
console.log(newCalc.name);

setTimeout(() => {
  console.log("Variaz vez");
}, 2000);

let value = 10;

const interval = setInterval(() => {
  console.log(value);
  value--;

  if (value === 0) {
    console.log("tempo expirado");
    clearInterval(interval);
  }
}, 1000);
