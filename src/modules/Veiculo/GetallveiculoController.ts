import { Request, Response } from "express";
import { Getallveiculo } from "./Getallveiculo";



export class GetallveiculoController{
    async handle(req: Request, res: Response){
        
        const getallveiculo = new Getallveiculo();

        const result = await getallveiculo.execute();

        return res.status(201).json(result);
    }
}