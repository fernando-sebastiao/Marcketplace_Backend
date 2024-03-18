import { Request, Response } from "express";
import { GetallManager } from "./Getallmenager";

export class GetallmanagerController{
    async handle(req: Request, res:Response){
        const getallmanager = new GetallManager();
        const result = await getallmanager.execute();
        return res.status(201).json(result);
    }
}