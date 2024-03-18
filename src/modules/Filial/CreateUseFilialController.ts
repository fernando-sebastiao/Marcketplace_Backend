import { Request, Response } from "express";
import { CreateUseFilial } from "./CreateUseFilial";


export class CreateUseFilialController{
    async handle(req: Request, res: Response){
        const {name,
            email,
            tel,
            address, 
            managerId, coordenadas} = req.body;

        const createusefilial = new CreateUseFilial();
        const result = await createusefilial.execute({
            name,
            tel,
            address,
            managerId,
            email, coordenadas});

        return res.status(201).json(result);
    }
}