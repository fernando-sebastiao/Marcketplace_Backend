import { Client } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";
import { ClienteDTO } from "../../dtos/Cliente-DTO";
import { AppError } from "../../erros/AppError";

export class CreateCliente{
    async execute({name, numberBI, address, tel, email, nascimento, filialId, avatar, coordenadas, password, status, sexo, paymentId}:ClienteDTO):Promise<Client>{
       const clienteexists = await prisma.client.findUnique({where:{email}});
       if(clienteexists){ 
        throw new AppError("Este cliente já existe!");
       }
       //verificando
        const filialexists = await prisma.filial.findUnique({where:{id:filialId}});
        if(!filialexists){
            throw new AppError("Esta filial não existe!");
        }
        //criar o cliente
        const cliente = await prisma.client.create({
            data:{
                name,
                numberBI,
                address,
                tel,
                email,
                nascimento,
                filialId,
                avatar,
                coordenadas,
                sexo,
                paymentId
            }
        });
        return cliente;
    }
}