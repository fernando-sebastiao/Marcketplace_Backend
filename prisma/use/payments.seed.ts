import { fakerPT_BR as faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { prisma } from "../../src/clients/prisma-client";

export async function seedPayments() {
  const today = dayjs();
  const clients = await prisma.client.findMany();
  const agents = await prisma.agents.findMany();

  for (const client of clients) {
    await prisma.payment.create({
      data: {
        endAt: today.add(1, "month").startOf("day").toDate(),
        clientId: client.id,
        agentId: faker.helpers.arrayElement(agents).id,
      },
    });
  }

  console.log("agents seeded")
}
