import { fakerPT_BR as faker } from "@faker-js/faker";
import { prisma } from "./prisma-client";
// import { hackId } from "../lib/hack";

export async function seedRecolhas() {
  const filial = faker.helpers.arrayElement(await prisma.filial.findMany());
  // const filial = { id: (await hackId()).filialId };

  if (!filial) return;
  const filialDrivers = await prisma.driver.findMany({
    where: { filialId: filial?.id },
  });
  const filialClients = await prisma.client.findMany({
    where: { filialId: filial?.id },
  });

  await prisma.recolha.create({
    data: {
      clientId: faker.helpers.arrayElement(filialClients).id,
      driverId: faker.helpers.arrayElement(filialDrivers).id,
      filialId: filial?.id,
      status: faker.helpers.arrayElement([
        // "andamento",
        "cancelada",
        // "finalizada",
      ]),
      distance: faker.number.float().toString(),
      duration: faker.number.float().toString(),
      directions: JSON.stringify(faker.science.chemicalElement(), null, 2),
      // createdAt: dayjs().subtract(10, "days").toDate(),
    },
  });

  await prisma.recolha.create({
    data: {
      clientId: faker.helpers.arrayElement(filialClients).id,
      driverId: faker.helpers.arrayElement(filialDrivers).id,
      filialId: filial?.id,
      status: "pendente",
      //  createdAt: dayjs().subtract(10, "days").toDate(),
    },
  });
  console.log("recolhas seeded")
}