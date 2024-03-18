import { Request, Response } from "express";
import { CreateUseDriver } from "./CreateUseDriver";


export class CreateUseDriverController{
    async handle(req: Request, res: Response){
        const {name,
            email,
            tel,
            nascimento,
            avatar,
            password,
            veiculoId,
            filialId,
            numberBI,
            code} = req.body;

        const createusedriver = new CreateUseDriver();
        const result = await createusedriver.execute({
            name,
            email,
            tel,
            nascimento,
            avatar,
            password,
            veiculoId,
            filialId,
            numberBI,
            code
        })

        return res.status(201).json(result);
    }
}