import { seedFull } from "./use/full.seed";
import { seedSuperManagers } from "./use/supermanager.seed";
import { seedRecolhas } from "./use/recolha.seed";
import { prisma } from "../src/clients/prisma-client";
import { seedClients } from "./use/clients";

async function Seed() {
  await seedSuperManagers();
  await seedFull({  drivers: 20 });
  await seedClients({clients: 13})
  await seedRecolhas({ recolhas: 51 });
  console.table({
    clients: await prisma.client.count(),
    drivers: await prisma.driver.count(),
    filas: await prisma.filial.count(),
    managers: await prisma.manager.count(),
    agents: await prisma.agents.count(),
    recolhas: await prisma.recolha.count(),
  });
  console.log("💥 Database seeded successfully!")
}

// Chamar a função assíncrona imediatamente
(async () => {
  try {
    await Seed();
  } catch (error) {
    console.error("Erro ao semear o banco de dados:", error);
  } finally {
    process.exit();
  }
})();
