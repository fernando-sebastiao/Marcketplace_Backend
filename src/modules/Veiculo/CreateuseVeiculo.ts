import { Veiculo } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";
import { VeiculoDTO } from "../../dtos/Veiculo-DTO";
import { AppError } from "../../erros/AppError";

export class CreateUseVeiculo {
    async execute({ matricula }: VeiculoDTO): Promise<Veiculo> {
        const Veiculoalreadyexistis = await prisma.veiculo.findUnique({ where: { matricula } });
        if (Veiculoalreadyexistis) {
            throw new AppError("Este Veiculo já existe. Insira a Mátricula novamente! ");
        }
        //Criar o Veiculo
        const veiculo = await prisma.veiculo.create({
            data: {
                matricula
            }
        });
        return veiculo;
    }
}