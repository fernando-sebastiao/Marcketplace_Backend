import { Recolhas } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";

export class GetallRecolha{
    async execute():Promise<Recolhas[]>{
        const recolha = prisma.recolhas.findMany({
            orderBy:{
                id: "desc",
            },
            include:{
                cliente:{
                    select:{
                        id: true,
                        name: true
                    }
                },
                filial:{
                    select:{
                        id: true,
                        name: true
                    }
                },
                driver:{
                    select:{
                        id:true,
                        name: true
                    }
                }
            }
        });
        return recolha;
    }
}