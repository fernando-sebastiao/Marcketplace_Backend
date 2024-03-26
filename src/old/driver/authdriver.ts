import dotenv from "dotenv";
import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { prisma } from "../../clients/prisma-client";
import { motoristaDTO } from "../../dtos/Driver-DTO";
import { AppError } from "../../erros/AppError";
export class Authdriver {
    async execute(req: Request, res: Response) {
        const { email, password }: motoristaDTO = req.body;

        const env = dotenv.config();
        //pegar o email e o driver
        const ifmotorista = await prisma.driver.findUnique({
            where: {
                email,
                password
            },
            select: {
                id: true,
                password: true,
                email: true,
                name: true,
                numberBI: true,
                nascimento: true,
                createdAt: true,
                veiculo: {
                    select: {
                        matricula: true
                    }
                }
            }
        });
        if (!ifmotorista) {
            throw new AppError("Credencias inválidas!")
        }
        const driver = {
            Dados_Driver: {
                id: ifmotorista.id,
                nome: ifmotorista.name
            },
            email: ifmotorista.email,
            numberBI: ifmotorista.numberBI,
            matricula: ifmotorista.veiculo?.matricula,
            createdAt: ifmotorista.createdAt
        }
        const driver1 = {
            password: ifmotorista.password
        }
        const token = Jwt.sign({ email: driver.email, password: driver1.password }, process.env.JSONWEBTOKEN_KEY ?? "", {
            expiresIn: "7d"
        });
        return res.json({
            Error: false,
            "message": "Token Enviado!",
            driver,
            token
        })
    }
}