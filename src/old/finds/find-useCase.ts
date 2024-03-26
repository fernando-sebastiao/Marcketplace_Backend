import { prisma } from "../../clients/prisma-client";

export class FindUseCase {
  async filias() {
    return prisma.filial.findMany({ select: { id: true, name: true } })
  }
  async drivers() {
    return prisma.driver.findMany({ select: { id: true, name: true } })
  }
  async clients() {
    return await prisma.client.findMany();
  }
  async managers() {
    return await prisma.manager.findMany();
  }
  async recolha() {
    return await prisma.recolha.findMany();
  }
}