import { Request, Response } from "express";
import { CreateRecolha } from "./CreateRecolha";

export class CreateRecolhaController{
    async handle(req: Request, res: Response){
        const {clienteId,
            filialId,
            driverId,
            directions,
            distance,
            duration,created_at, update_at} = req.body;

        const createrecolha = new CreateRecolha();
        const result = await createrecolha.execute({
            clienteId,
            filialId,
            driverId,
            directions,
            distance,
            duration, created_at, update_at})

        return res.status(201).json(result);
    }
}