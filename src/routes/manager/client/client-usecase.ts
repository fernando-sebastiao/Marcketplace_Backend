import dayjs from "dayjs";
import { prisma } from "../../../clients/prisma-client";
import { clientByIdProps, geoMapFilter } from "../../../../types";

interface decodedUserProps {
  id: string;
  filialId: string;
}


interface deleteClientProps extends decodedUserProps {
  clintId: string;
  key: string;
}

export class ClientUseCase {
  async find({ filialId }: decodedUserProps) {
    return await prisma.client.findMany({
      where: {
        filialId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        numberBI: true,
        nascimento: true,
        createdAt: true,
      },
    });
  }
  async delete({ id, key, clintId, filialId }: deleteClientProps) {
    if (
      !(await prisma.manager.findUnique({
        where: {
          id,
          password: key,
        },
      }))
    ) {
      throw Error("Chave do manager incorreta");
    }

    if (
      !(await prisma.client.findUnique({
        where: {
          id: clintId,
          filialId,
        },
      }))
    ) {
      throw Error("Cliente não encontrado");
    }

    await prisma.client.delete({
      where: {
        id: clintId,
        filialId,
      },
    });
  }
  async findById({ id, filialId }: clientByIdProps) {
    if (!(await prisma.client.findUnique({ where: { id, filialId } }))) {
      throw new Error("Cliente não encontrado!");
    }

    const heatData = await prisma.recolha.groupBy({
      by: ["createdAt"],
      where: {
        clientId: id,
        status: {
          in: ["finalizada", "cancelada"],
        },
      },
      _count: true,
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      client: await prisma.client.findUnique({
        where: {
          id,
          filialId,
        },
        select: {
          avatar: true,
          name: true,
          email: true,
          createdAt: true,
          tel: true,
          filial: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              recolhas: true,
            },
          },
        },
      }),
      heatMap: heatData.map((e) => {
        return {
          date: dayjs(e.createdAt).format("YYYY/MM/DD"),
          count: e._count,
        };
      }),
    };
  }
  async geoMap({ filialId, numberBI }: geoMapFilter) {
    return await prisma.client.findMany({
      select: {
        id:true,
        numberBI: true,
        name: true,
        coordenadas: true,
      },
      where: {
        filialId,
        numberBI:{
          contains:numberBI
        }
      },
    });
  }
}