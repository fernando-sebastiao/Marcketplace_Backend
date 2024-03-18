import { Request, Response } from "express";
import { CreateUseVeiculo } from "./CreateuseVeiculo";


export class CreateUseVeiculoController{
    async handle(req: Request, res: Response){
        const {matricula} = req.body;

        const createuseveiculo = new CreateUseVeiculo();
        const result = await createuseveiculo.execute({matricula})

        return res.status(201).json(result);
    }
}