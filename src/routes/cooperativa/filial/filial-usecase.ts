import dayjs from "dayjs";
import { clientByIdProps, decodedUserIdProps } from "../../../../types";
import { prisma } from "../../../clients/prisma-client";

interface decodedUserProps {
  id: string;
  filialId: string;
}


interface deleteClientProps extends decodedUserIdProps {
  clintId: string;
  key: string;
  filialId: string;
}
interface deleteFilialpropos extends decodedUserIdProps{
    id:string,
    key:string,
    filialId:string
}


export class FilialUseCase {
  async find() {
    return await prisma.filial.findMany({
      select: {
        id:true,
        name:true,
        tel:true,
        email:true,
        coordenadas:true,
        manager:{
            select:{
                id:true,
                name:true
            }
        }
      },
    });
  }
  async delete({ id, key, filialId }: deleteFilialpropos) {
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
      !(await prisma.filial.findUnique({
        where: {
          id: filialId,
        },
      }))
    ) {
      throw Error("Filial não encontrado");
    }

    await prisma.filial.delete({
      where: {
        id: filialId,
      },
    });
  }
  async findById({ id }: clientByIdProps) {
    if (!(await prisma.filial.findUnique({ where: { id } }))) {
      throw new Error("filial não encontrada!");
    }
    return {
      client: await prisma.filial.findUnique({
        where: {
          id,
        },
        select: {
          name: true,
          email: true,
          createdAt: true,
          tel: true,
          },
         
        }),
      }}
    }
