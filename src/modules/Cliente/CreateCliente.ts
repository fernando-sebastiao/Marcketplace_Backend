import { Cliente } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";
import { ClienteDTO } from "../../dtos/Cliente-DTO";
import { AppError } from "../../erros/AppError";

export class CreateCliente{
    async execute({name, numberBI, address, tel, email, nascimento, filialId, avatar, coordenadas, password, status}:ClienteDTO):Promise<Cliente>{
       const clienteexists = await prisma.cliente.findUnique({where:{email}});
       if(clienteexists){ 
        throw new AppError("Este cliente já existe!");
       }
       //verificando
        const filialexists = await prisma.filial.findUnique({where:{id:filialId}});
        if(!filialexists){
            throw new AppError("Esta filial não existe!");
        }
        //criar o cliente
        const cliente = await prisma.cliente.create({
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
                password,
                status
            }
        });
        return cliente;
    }
}