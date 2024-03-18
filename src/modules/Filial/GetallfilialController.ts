import { Request, Response } from "express";
import { Getallfilial } from "./Getallfilial";

export class GetallfilialConntroller{
    async handle(req: Request, res: Response){
       

        const getallfilial = new Getallfilial();
        const result = await getallfilial.execute()

        return res.status(201).json(result);
    }
}