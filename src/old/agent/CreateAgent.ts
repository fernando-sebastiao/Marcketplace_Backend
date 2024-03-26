import { Agents } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";
import { AgentDTO } from "../../dtos/Agent-DTO";
import { AppError } from "../../erros/AppError";

export class CreateAgent{
    async execute({name, email, password, tel, filialId}:AgentDTO):Promise<Agents>{

        const ifagent = await prisma.agents.findUnique({where:{email}});
        if(ifagent){
            throw new AppError("Insira outro Email!")
        }
        const iffilial = await prisma.filial.findUnique({where:{id:filialId}});
        if(!iffilial){
            throw new AppError("Esta filial não existe. Insira outra!");
        }
        //criando
        const agent = await prisma.agents.create({
            data:{
                name,
                password,
                email,
                tel,
                filialId
            }
        });
        return agent;
    }
}