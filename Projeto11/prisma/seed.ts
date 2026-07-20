import { prisma } from "@/prisma";

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        name: "Matheus",
        email: "matheus@email.com",
      },
      {
        name: "Flávio",
        email: "flavio@email.com",
      },
    ],
  });
}

seed().then(() => {
  console.log("Database seeded");
  prisma.$disconnect();
});
