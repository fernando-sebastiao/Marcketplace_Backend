import dayjs from "dayjs";
import type { authenticateData, filialStatusData } from "./manager";
import { prisma } from "../../clients/prisma-client";
import { encrypt } from "../../lib/jose";

interface decodedUserProps {
  id: string;
  filialId: string;
}

interface filialStatusProps extends decodedUserProps {
  filial: filialStatusData;
}
interface recolhaByIdProps extends decodedUserProps {
  recolhaId: string;
}
interface deleteClientProps extends decodedUserProps {
  clintId: string;
  key: string;
}

export class ManagerUseCase {
  async clients({ filialId }: decodedUserProps) {
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
  async profile({ id }: decodedUserProps) {
    return prisma.manager.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        role: true,
        createdAt: true,
        tel: true,
      },
    });
  }
  async updateFilialStatus({
    filial: { status },
    filialId,
  }: filialStatusProps) {
    return prisma.filial.update({
      where: {
        id: filialId,
      },
      data: {
        status,
      },
    });
  }
  async authenticate({ email, filialId, password }: authenticateData) {
    const user = await prisma.filial.findFirst({
      where: {
        AND: [
          { id: filialId },
          {
            manager: {
              role: "gerente",
              email,
              password,
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    console.log(user);
    if (!user || !user.manager) {
      console.log("erro");
      throw new Error("Credenciais inválidas");
    }
    const userInfo = {
      id: user.manager.id,
      name: user.manager.name,
      email: user.manager.email,
      avatar: user.manager.avatar,
      filial: {
        id: user.id,
        name: user.name,
      },
    };

    const token = await encrypt({
      id: userInfo.id,
      filialId: userInfo.filial.id,
    });
    console.log({
      user: userInfo,
      token,
    });
    return {
      user: userInfo,
      token,
    };
  }

}