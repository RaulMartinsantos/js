"use strict";

class User {
  constructor(_ref) {
    let email = _ref.email;
    this.email = email;
  }
  async sendMessage() {
    console.log("Mensagem enviada para ".concat(this.email));
  }
}
let user = new User({
  email: "raul@email.com"
});
user.sendMessage();