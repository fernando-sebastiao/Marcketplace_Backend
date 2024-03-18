import { Manager } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";
interface recolhasProps{
    filialId:string
}

interface profile {
    id:string
}

export class ManagerUseCase{
    async recolhas({ filialId }:recolhasProps){
        const manager = await prisma.recolha.findMany({
            orderBy:{
                createdAt: "desc"
            },
            where:{
                filialId
            },
            include:{
                filial:{
                    select:{
                        id: true,
                        name: true,
                        email: true,
                        tel: true,
                        address: true,
                    }
                }
            }
        });
        return manager;
    }
    async profile({ id }:profile){
        return await prisma.manager.findFirst({
            where:{
                id
            }
        });
        
    }
}