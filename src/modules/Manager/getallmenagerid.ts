import { Request, Response } from "express";
import { prisma } from "../../clients/prisma-client";
import { AppError } from "../../erros/AppError";

export class allmanagerID{
    async execute(req: Request, res: Response){
        const {id} = req.params;    
        //pegar o Manager
        const manager = await prisma.manager.findUnique({where:{id}});
        if(!manager){
            throw new AppError("This Manager does not exists!");
        }
        return res.json({
            Error: false,
            manager
        });
    }
}