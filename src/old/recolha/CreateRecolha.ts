import { Recolhas } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";
import { RecolhasDTO } from "../../dtos/Recolhas-DTO";

export class CreateRecolha{
    async execute({clienteId, distance,directions,duration, driverId, filialId}:RecolhasDTO):Promise<Recolhas>{
        //verificar se o cliente realmente existe
        // const clienteexists = await prisma.cliente.findUnique({where:{
        //     id: clienteId,
        //     status:"Pago"
        // }});
        // if(!clienteexists){
        //     throw new AppError("Mensalidade não paga! Diriga-se ao posto mais próximo e efectue o pagamento! Obrigado.");
        // }
        //verificar se realmente a filial existe
        // const filialexists = await prisma.filial.findUnique({where:{
        //     id:clienteexists.filialId, 
        //     status: "aberto"
        // }});
        // if(!filialexists){
        //     throw new AppError("Infelizmente esta filial não se encontra disponivel!");
        // }
        //verificar se realmente o driver existe
        // const driverexists = await prisma.driver.findMany({where:{
        //     filialId: filialexists.id,
        //     status: "On"
        // }});
        // if(!driverexists){
        //     throw new AppError("No driver available!")
        // }

        // const cliente = await prisma.cliente.findFirst({where:{
        //     id: 
        // }})
        // :driverexists[0].id
        // :filialexists.id
        //criar recolhas
        const recolha = await prisma.recolhas.create({
            data:{
                clienteId,
                driverId,
                filialId,
                directions,
                distance,
                duration,
                status:"cancelada"
            }
        });
        return recolha;
    }
}