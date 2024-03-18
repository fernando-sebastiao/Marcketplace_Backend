import { Manager } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";
import { managerDTO } from "../../dtos/Manager-DTO";
import { AppError } from "../../erros/AppError";

export class CreateUseManager{
    async execute({name, tel,  email,password}:managerDTO): Promise<Manager>{
        const managerreadyexists = await prisma.manager.findUnique({where:{email}});
        if(managerreadyexists){
            throw new AppError("Este Manager já existe. Insira novamente!");
        }
        //Criar o Manager
        const manager = await prisma.manager.create({
            data:{
                name,
                tel, 
                email
            }
        });
        return manager;
    }
}