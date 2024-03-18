import { Request, Response } from "express";
import { GetallRecolha } from "./GetallRecolha";

export class GetallrecolhaController{
    async handle(req: Request, res:Response){
        const getallrecolha = new GetallRecolha();
        const result = await getallrecolha.execute();

        return res.status(201).json(result);
    }
}