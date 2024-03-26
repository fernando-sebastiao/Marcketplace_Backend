import { decodedUserFilialIdProps, decodedUserIdProps, updateKeyProps } from "../../../../types";
import { prisma } from "../../../clients/prisma-client";

interface updateProfileType extends decodedUserIdProps {
    name: string;
    email: string;
    avatar?: string | null;
}

interface updateTelProps extends decodedUserIdProps {
  tel:string
}

export class SettingsUsecase {
  async getOverView({ filialId }: decodedUserFilialIdProps) {
    return await prisma.filial.findFirstOrThrow({
      where: {
        id:filialId,
      },
      select: {
        name: true,
        tel: true,
        status: true,
        createdAt: true,
        _count: {
          select: {
            clients: true,
            drivers: true,
            recolhas: true,
          },
        },
      },
    });
  }
 async updateKey ({ antiga, id,nova}:updateKeyProps) {
   const manager = await prisma.manager.findUnique({
     where: {
       password: antiga,
       id,
     },
   });
   if (!manager) {
     throw Error("Senha atual incorreta");
   }

   await prisma.manager.update({
     where: {
       id: manager.id,
     },
     data: {
       password: nova,
     },
   });
 }
 async updateProfile({ avatar, email, name, id }: updateProfileType) {
   await prisma.manager.update({
     where: {
       id
     },
     data: {
       avatar,
       email,
       name,
     },
   });
 }
  async updateTel({ tel, id }: updateTelProps) {
    await prisma.manager.update({
      where: {
        id,
      },
      data: {
        tel,
      },
    });
  }
}