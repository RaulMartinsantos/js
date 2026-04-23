const user = {
  id: 1,
  name: "Raul",
  /*address: {
    street: "Av Paulista",
    city: "São Paulo",
    geo: {
      latitude: 45.23556,
      longitude: 15.13565,
    },
  },
  message: function () {
    console.log(`Olá ${this.name}!`);
  },
  */
};

console.log(user?.address?.geo.latitude);
user.message?.();
