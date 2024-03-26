import dayjs from "dayjs";
import { deleteRecolhaCoProps, deleteRecolhaProps, recolhaByIdCoProps, recolhaByIdProps } from "../../../../types";
import { prisma } from "../../../clients/prisma-client";

export class RecolhaUseCase {
  async find() {
    const startDate = dayjs().subtract(1, "M");
    return await prisma.recolha.findMany({
      where: {
        createdAt: {
          gte: startDate.startOf("day").toDate(),
        },
      },
      select: {
        id: true,
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            createdAt: true,
          },
        },
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            createdAt: true,
          },
        },
        status: true,
        createdAt: true,
      },
    });
  }
  async findById({ recolhaId }: recolhaByIdCoProps) {
    console.log("aqui");
    const recolha = await prisma.recolha.findFirst({
      where: {
        id: recolhaId,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        duration: true,
        distance: true,
        client: {
          select: {
            name: true,
            tel: true,
            email: true,
          },
        },
        driver: {
          select: {
            name: true,
            veiculo: {
              select: {
                matricula: true,
              },
            },
          },
        },
        filial: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!recolha) {
      throw new Error("Recolha não encontrada!");
    }
    return recolha;
  }
  async delete({ id, key, clintId }: deleteRecolhaCoProps) {
    if (
      !(await prisma.manager.findUnique({
        where: {
          id,
          password: key,
        },
      }))
    ) {
      throw Error("Senha do manager incorreta");
    }

    if (
      !(await prisma.recolha.findUnique({
        where: {
          id: clintId,
        },
      }))
    ) {
      throw Error("Recolha não encontrada!");
    }

    await prisma.recolha.delete({
      where: {
        id: clintId,
      },
    });
  }
}
