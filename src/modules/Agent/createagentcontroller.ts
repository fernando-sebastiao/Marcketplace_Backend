import { Request, Response } from "express";
import { CreateAgent } from "./CreateAgent";


export class CreateAgentController{
    async handle(req:Request, res: Response){
        
        const {name, password, email, tel, filialId} = req.body;
        
        const createagent = new CreateAgent();
        const result = await createagent.execute({name, password, email, tel, filialId});

       return res.status(201).json(result);
    }
}