import { Request, Response } from "express";
import { prisma } from "../../clients/prisma-client";
import { AppError } from "../../erros/AppError";

export class allveiculoID{
    async execute(req: Request, res: Response){
        const {id} = req.params;    
        //pegar o cliente
        const veiculo = await prisma.veiculo.findUnique({where:{id}});
        if(!veiculo){
            throw new AppError("This Veiculo does not exists!");
        }
        return res.json({
            Error: false,
            veiculo
        });
    }
}


