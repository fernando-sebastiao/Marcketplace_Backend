
import dayjs from "dayjs";
import { prisma } from "../../../clients/prisma-client";
import { decodedUserFilialIdProps, deleteRecolhaProps, recolhaByIdProps } from "../../../../types";


export class RecolhaUseCase {
  async find({ filialId }: decodedUserFilialIdProps) {
    const startDate = dayjs().subtract(1, "M");
    return await prisma.recolha.findMany({
      where: {
        filialId,
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
  async findById({ recolhaId, filialId }: recolhaByIdProps) {
  console.log("aqui")
    const recolha= await prisma.recolha.findFirst({
      where: {
        id: recolhaId,
        filialId: {
          equals: filialId,
        },
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
    if(!recolha){
      throw new Error("Recolha não encontrada!")
    }
    return recolha
  }
  async delete({ id, key, clintId, filialId }: deleteRecolhaProps) {
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
          filialId,
        },
      }))
    ) {
      throw Error("Recolha não encontrada!");
    }

    await prisma.recolha.delete({
      where: {
        id: clintId,
        filialId,
      },
    });
  }
}
