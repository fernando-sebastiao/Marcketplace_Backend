import { Filial } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";

export class Getallfilial{
    async execute():Promise<Filial[]>{
        const filial = await prisma.filial.findMany({
            orderBy:{
                name: "desc"
            }
        });
        return filial;
    }
}