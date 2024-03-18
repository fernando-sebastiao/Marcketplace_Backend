import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../clients/prisma-client";
import { authclienteDTO } from "../../dtos/Cliente-DTO";

// JSONWEBTOKEN_KEY//
export class Authcliente {
    async execute(req: Request, res: Response) {
        const { email, password }: authclienteDTO = req.body;
        const env = dotenv.config();
        //pegar o email e a filial//
        const ifcliente = await prisma.cliente.findUnique({
            where:{
                email,
                 password
            },
            select:{
                id:true,
                password:true,
                nascimento:true,
                email:true,
                numberBI:true,
                tel:true
            }
        })

        const cliente = {
            id:ifcliente?.id,
            nascimento: ifcliente?.nascimento,
            email:ifcliente?.email,
            BInumber: ifcliente?.numberBI,
            telefone: ifcliente?.tel
        }

        const token = jwt.sign({ Email:ifcliente?.email, Password:ifcliente?.password}, process.env.JSONWEBTOKEN_KEY ?? "", {
            expiresIn: "7d"
        })
        return res.json({
            Error: false,
            "message": "Token Enviado!",
            cliente,
            token
        });
    }
}