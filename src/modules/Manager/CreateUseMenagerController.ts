import { Request, Response } from "express";
import { CreateUseManager } from "./CreateUseMenager";
export class CreateUseManagerController{
    async handle(req: Request, res: Response){

        const {name,tel, email,password, created_at, update_at} = req.body;

        const createusemanager = new CreateUseManager();

        const result = await createusemanager.execute({name,tel, email,password, created_at, update_at});
        
        return res.status(201).json(result);
    }
}