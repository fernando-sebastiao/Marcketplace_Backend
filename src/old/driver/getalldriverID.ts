import { Request, Response } from "express";
import { prisma } from "../../clients/prisma-client";
import { AppError } from "../../erros/AppError";

export class alldriverID{
    async execute(req: Request, res: Response){
        const {id} = req.params;    
        //pegar o Driver
        const driver = await prisma.driver.findUnique({where:{id}});
        if(!driver){
            throw new AppError("This driver does not exists!");
        }
        return res.json({
            Error: false,
            driver
        });
    }}