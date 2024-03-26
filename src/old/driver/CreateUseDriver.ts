import { Driver } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";
import { DriverDTO } from "../../dtos/Driver-DTO";
import { AppError } from "../../erros/AppError";

export class CreateUseDriver{
    async execute({name, email, tel,nascimento, numberBI, avatar, password, veiculoId, filialId, code}:DriverDTO):Promise<Driver>{
        const driveralreadyexists = await prisma.driver.findUnique({where:{email}});
        if(driveralreadyexists){
            throw new AppError("Este Motorista já Exite!Tente cadastrar com outro Email.Obrigado!");
        }
        const numberBIalreadyexists = await prisma.driver.findUnique({where:{numberBI}});
        if(numberBIalreadyexists){
            throw new AppError("Este número de Bilhete é compativél com um já existente! Insira novamente.");
        }
        const filialreadyexists = await prisma.filial.findUnique({where:{id:filialId}});
        if(!filialreadyexists){
            throw new AppError("Esta Filial não existe! Por favor, Insira novamente!")
        }
        const Veiculoalreadyexistis = await prisma.veiculo.findUnique({where:{id:veiculoId}})
        if(!Veiculoalreadyexistis){
            throw new AppError("This veiculo does not exists")
        }
        //Criar Driver
        const valores = await prisma.driver.create({
            data:{
                name,
                email,
                tel,
                nascimento,
                avatar,
                password,
                veiculoId,
                filialId,
                numberBI,
                code,
            }
        });
        return valores;
    }
}