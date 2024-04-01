import { prisma } from "../../clients/prisma-client";
import { encrypt } from "../../lib/jose";
import { filialStatusData } from "../manager/manager";
import type { authenticateData } from "./cooperativa";

interface decodedUserProps {
  id: string;
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

export class CooperativaUseCase {
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
  async authenticate({ email, password }: authenticateData) {
    const user = await prisma.filial.findFirst({
      where: {
        AND: [
          {
            manager: {
              role: "superGerente",
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
