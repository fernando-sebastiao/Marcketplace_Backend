import { Request, Response } from "express";
import { prisma } from "../../clients/prisma-client";
import { AppError } from "../../erros/AppError";

export default{
 async DeleteAgent(res:Response, req:Request){
    const {managerId, agentId} = req.body;

    const ifmanager = await prisma.manager.findUnique({
        where:{
            id:managerId,
            filial:{
                some:{
                    Agent:{
                        some:{
                            id:agentId
                        }
                    }
                }
            }
        }
    });
    if(!ifmanager){
        throw new AppError("Não tem permissão de Deletar!")
    }
    const agente = await prisma.agents.delete({
        where:{
            id:agentId
        }
    })
    return res.json({
        Error:false,
        message: "Deletado com sucesso",
        agente
    });
 },
   async UpdateAgente(request: Request, response: Response){
    const {id, name, tel, password} = request.body;
    
 const verificar = await prisma.agents.findFirst({where:{id}});
 if(!verificar){
    throw new AppError("Número de identificação inválido!")
 }
 
    //Fazer o update do agente
    const agente = await prisma.agents.update({
     where:{
       id
     },
     data:{
       name,
       tel, 
       password
     }
    });
    return response.json({
     Error: false,
     message:"Sucesso: Agente actualizado com sucesso!",
     agente
    });
   },
   
}