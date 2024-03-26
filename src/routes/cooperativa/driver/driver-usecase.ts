import dayjs from "dayjs";
import {
  decodedUserFilialIdProps,
  driverByIdExtendedProps,
} from "../../../../types";
import { prisma } from "../../../clients/prisma-client";
import type { updateStatusData } from "./driver";

interface decodedUserProps {
  id: string;
  filialId: string;
}

interface deleteClientProps extends decodedUserProps {
  driverId: string;
  key: string;
}

interface updateStatusProps extends updateStatusData {
  filialId: string;
  id: string;
}

export class DriverUseCase {
  async find({ filialId }: decodedUserFilialIdProps) {
    return await prisma.driver.findMany({
      select: {
        id: true,
        numberBI: true,
        name: true,
        email: true,
        createdAt: true,
        status: true,
        veiculo: {
          select: {
            matricula: true,
          },
        },
      },
    });
  }
  async findById({ id, filialId }: driverByIdExtendedProps) {
    const driver = await prisma.driver.findFirst({
      where: {
        filialId,
        id,
      },
      select: {
        avatar: true,
        name: true,
        email: true,
        createdAt: true,
        tel: true,
        veiculo: {
          select: {
            matricula: true,
          },
        },
        filial: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!driver) {
      throw new Error("Motorista ñ encontrado!");
    }
    const rowValue = await prisma.recolha.groupBy({
      by: ["status"],
      where: {
        driverId: id,
        status: {
          in: ["finalizada", "cancelada"],
        },
      },
      _count: true,
    });
    const heatData = await prisma.recolha.groupBy({
      by: ["createdAt"],
      where: {
        driverId: id,
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
      driver,
      heatMap: heatData.map((e) => {
        return {
          date: dayjs(e.createdAt).format("YYYY/MM/DD"),
          count: e._count,
        };
      }),
      row: {
        finalizada: rowValue[0] ? rowValue[0]._count : 0,
        cancelada: rowValue[1] ? rowValue[1]._count : 0,
      },
    };
  }
  async delete({ id, key, driverId, filialId }: deleteClientProps) {
    if (
      !(await prisma.manager.findUnique({
        where: {
          id,
          password: key,
        },
      }))
    ) {
      throw Error("Senha manager");
    }

    if (
      !(await prisma.driver.findUnique({
        where: {
          id: driverId,
          filialId,
        },
      }))
    ) {
      throw Error("Motorista não encontrado!");
    }

    await prisma.driver.delete({
      where: {
        id: driverId,
        filialId,
      },
    });
  }
  async updateStatus({ id, status, filialId }: updateStatusProps) {
    if (
      !(await prisma.driver.findFirst({
        where: {
          id,
          filialId,
        },
      }))
    )
      throw new Error("Motorista não encontrado!");

    await prisma.driver.update({
      data: {
        status,
      },
      where: {
        id,
        filialId,
      },
      select: {
        id: true,
        numberBI: true,
        name: true,
        email: true,
        createdAt: true,
        status: true,
        veiculo: {
          select: {
            matricula: true,
          },
        },
      },
    });
    return;
  }
  async geoMap({ filialId }: decodedUserFilialIdProps) {
    return await prisma.driver.findMany({
      select: {
        id: true,
        name: true,
        coordenadas: true,
      },
      where: {
        filialId,
      },
    });
  }
}
