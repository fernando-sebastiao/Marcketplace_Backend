import { Request, Response } from "express";
import { prisma } from "../../clients/prisma-client";
import { AppError } from "../../erros/AppError";

export class allclientID{
    async execute(req: Request, res: Response){
        const {id} = req.params;    
        //pegar o cliente
        const cliente = await prisma.cliente.findUnique({where:{id}});
        if(!cliente){
            throw new AppError("Este cliente não existe!");
        }
        return res.json({
            Error: false,
            cliente
        });
    }
}