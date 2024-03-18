import { Filial } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";
import { FilialDTO } from "../../dtos/Filial-DTO";
import { AppError } from "../../erros/AppError";


export class CreateUseFilial{
    async execute({name, address, tel, email, managerId, coordenadas}:FilialDTO):Promise<Filial>{

        const filialreadyexists = await prisma.filial.findUnique({where:{email}})
        
        
        if(filialreadyexists){
            throw new AppError("Este filial já existe!");
        }
        //Verificar se o Manager Existe
        const menagealreadyexists = await prisma.manager.findUnique({where:{id:managerId}});
        if(!menagealreadyexists){
            throw new AppError("Infelizmente este Manager não existe. Insira novamente!")
        }
        //Criar Coooperativa
        const dados = await prisma.filial.create({
            data:{
                name,
                email,
                tel,
                address, 
                managerId,
                coordenadas
        }
        });
        return dados;
    }
}