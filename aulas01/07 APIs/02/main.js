class User {
  constructor({ email }) {
    this.email = email;
  }

  async sendMessage() {
    console.log(`Mensagem enviada para ${this.email}`);
  }
}

let user = new User({ email: "raul@email.com" });
user.sendMessage();
