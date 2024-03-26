import { Request, Response } from "express";
import { prisma } from "../../clients/prisma-client";
import { AppError } from "../../erros/AppError";

export class allRecolhaID{
    async execute(req: Request, res: Response){
        const {id} = req.params;    
        //pegar a Recolha
        const recolha = await prisma.recolhas.findUnique({where:{id}});
        if(!recolha){
            throw new AppError("This Recolha does not exists!");
        }
        return res.json({
            Error: false,
            recolha
        });
    }
}