import { Request, Response } from "express";
import { CreateCliente } from "./CreateCliente";



export class CreateClienteController{
    async handle(req: Request, res: Response){
        const {name, numberBI, address, tel, email, nascimento, filialId, avatar,coordenadas, status, password} = req.body;

        const createcliente = new CreateCliente();
        const result = await createcliente.execute({name, numberBI, address, tel, email, nascimento, filialId, avatar, coordenadas, status, password})

        return res.status(201).json(result);
    }
}
