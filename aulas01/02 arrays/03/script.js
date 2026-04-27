let users = [];
console.log(users);

users.push("Raul");
users.push("Tamires");
users.push("Marcos");
users.unshift("Mariana");

console.log(users);

let positions = users.indexOf("Tamires");

console.log(positions)
users.splice(positions, 1);
console.log(users);
