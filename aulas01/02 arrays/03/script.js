let users = [];
console.log(users);

users.push("Raul");
users.push("Tamires");
users.push("Marcos");
users.unshift("Mariana");

console.log(users);

let positions = users.indexOf("Tamires");

users.splice(positions, 1);
console.log(users);
