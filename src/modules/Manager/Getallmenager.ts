import { Manager } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";

export class GetallManager{
    async execute():Promise<Manager[]>{
        const manager = await prisma.manager.findMany({
            orderBy:{
                name: "desc"
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
}