import { Veiculo } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";

export class Getallveiculo{

    async execute(): Promise <Veiculo[]>{
        const veiculo = await prisma.veiculo.findMany({
            orderBy:{
                id: "desc"
            },
            include:{
                driver:{
                    select:{
                        id: true,
                        name:true,
                        tel: true,
                        email: true,
                        coordenadas:true

                    }
                }
            }
        });
        return veiculo;
    }
}