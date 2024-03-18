import { Request, Response } from "express";
import { prisma } from "../../clients/prisma-client";
import { AppError } from "../../erros/AppError";

export class allfilialID{
    async execute(req: Request, res: Response){
        const {id} = req.params;    
        //pegar a Filial
        const filial = await prisma.filial.findUnique({where:{id}});
        if(!filial){
            throw new AppError("Esta Filial não existe!");
        }
        return res.json({
            Error: false,
            filial
        });
    }
}