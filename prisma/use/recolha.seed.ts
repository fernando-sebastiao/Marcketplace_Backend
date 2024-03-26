import { fakerPT_BR as faker } from "@faker-js/faker";
import { prisma } from "../../src/clients/prisma-client";

interface seedRecolhasProps {
  recolhas: number;
}
export async function seedRecolhas({
  recolhas: recolhasLength,
}: seedRecolhasProps) {
  const filias = await prisma.filial.findMany();
  const recolhas = Array.from({ length: recolhasLength });

  for (const filial of filias) {
    const filialDrivers = await prisma.driver.findMany({
      where: { filialId: filial.id },
    });
    const filialClients = await prisma.client.findMany({
      where: { filialId: filial.id },
    });

    for (const recolha of recolhas) {
      /**
       * Criar recolhas finalizadas e canceladas
       */
      await prisma.recolha.create({
        data: {
          clientId: faker.helpers.arrayElement(filialClients).id,
          driverId: faker.helpers.arrayElement(filialDrivers).id,
          filialId: filial.id,
          status: faker.helpers.arrayElement(["cancelada", "finalizada"]),
          distance: faker.number.float().toString(),
          duration: faker.number.float().toString(),
          directions: JSON.stringify(faker.science.chemicalElement(), null, 2),
        },
      });

      /**
       * criar recolhas em andamento
       *  - Tenhem drivers
       *  -  estão a ser executadas nesse exato momento
       *  - Já tenhem direções
       *  - Sem duração
       */
      await prisma.recolha.create({
        data: {
          clientId: faker.helpers.arrayElement(filialClients).id,
          driverId: faker.helpers.arrayElement(filialDrivers).id,
          filialId: filial.id,
          status: faker.helpers.arrayElement(["andamento"]),
          distance: faker.number.float().toString(),
          directions: JSON.stringify(faker.science.chemicalElement(), null, 2),
        },
      });

      /**
       * criar recolhas pendentes
       *  - Já tenhem drivers mais ainda ñ estão a ser executadas
       */

      await prisma.recolha.create({
        data: {
          clientId: faker.helpers.arrayElement(filialClients).id,
          driverId: faker.helpers.arrayElement(filialDrivers).id,
          filialId: filial.id,
          status: "pendente",
        },
      });
    }
  }

  console.log("recolhas seeded")
}