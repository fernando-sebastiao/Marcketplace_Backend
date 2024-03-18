import { Cliente } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";

export class GetallCliente{
    async execute(): Promise <Cliente[]>{
        const cliente = await prisma.cliente.findMany({
            orderBy: {
                id: "desc"
            },
            include:{
                author_filial:{
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