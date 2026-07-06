import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("products").del();

  // Inserts seed entries
  await knex("products").insert([
    { name: "Hambúrguer Artesanal", price: 32.9 },
    { name: "X-Bacon", price: 28.9 },
    { name: "Pizza Margherita", price: 54.9 },
    { name: "Lasanha à Bolonhesa", price: 39.9 },
    { name: "Filé à Parmegiana", price: 49.9 },
    { name: "Frango Grelhado", price: 34.9 },
    { name: "Salmão ao Molho de Maracujá", price: 62.9 },
    { name: "Risoto de Cogumelos", price: 45.9 },
    { name: "Espaguete à Carbonara", price: 41.9 },
    { name: "Salada Caesar", price: 29.9 },
    { name: "Strogonoff de Carne", price: 37.9 },
  ]);
}
