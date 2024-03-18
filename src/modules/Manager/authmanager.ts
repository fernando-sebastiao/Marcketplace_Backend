import dotenv from "dotenv";
import { Request, Response } from "express";
import { prisma } from "../../clients/prisma-client";
import { managerAuth } from "../../dtos/Manager-DTO";
import { AppError } from "../../erros/AppError";
import { encrypt } from "../../lib/jose";

// JSONWEBTOKEN_KEY
export class Authmanager {
    async execute(req: Request, res: Response) {
        const { email, filialId, password }: managerAuth = req.body;
        //pegar o email e a filial//
        const user = await prisma.filial.findUnique({
            where: {
                id: filialId,
                manager: {
                    role: "gerente",
                    email,
                    password
                },
            },
            select: {
                id:true,
                name:true,
                manager:{
                    select:{
                        id:true,
                        name:true,
                        avatar:true,
                        email:true,
                    }
                }
            }
        })
        if(!user || !user.manager){
            throw new AppError("Credencias inválidas!")
        }

        const manager={
            id:user.manager.id,
            name:user.manager.name,
            email:user.manager.email,
            avatar:user.manager.avatar,
            filial:{
                id:user?.id,
                name:user?.name,
            }
        }
        
        const token= await encrypt({ id:manager.id, filialId:manager.filial.id })

        console.log({
            user:manager,
            token
        })

       return res.json({
            user:manager,
            token
        });
    }
}