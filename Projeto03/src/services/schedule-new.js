import { apiConfig } from "./api-config.js";

export async function scheduleNew({ id, name, when }) {
  try {
    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        id: String(Date.now()),
        name,
        when,
      }),
    });

    alert("Agendamento realizado com sucesso!");
  } catch (err) {
    console.log(err);
    alert("Não foi possível agendar tente novamente mais tarde");
  }
}
