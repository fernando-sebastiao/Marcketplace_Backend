import { Client } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";

export class GetallCliente{
    async execute(): Promise <Client[]>{
        const cliente = await prisma.client.findMany({
            orderBy: {
                id: "desc"
            },
            include:{
                filial:{
                    select:{
                        name:true,
                        email:true,
                        address:true,
                        tel: true
                    }
                }
            }
        });

        return cliente;
    }
}