import { Request, Response } from "express";
import { GetallCliente } from "./GetallCliente";


export class GetallClienteController{
    async handle(req: Request, res: Response){
        
        const getallcliente = new GetallCliente();

        const result = await getallcliente.execute();

        return res.status(201).json(result);
    }
}