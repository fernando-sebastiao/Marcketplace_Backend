import { Request, Response } from "express";
import { GetallDriver } from "./GetallDriver";

export class GetallDriverController{
    async handle(req: Request, res:Response){
        const getalldriver = new GetallDriver();
        const result = await getalldriver.execute();

        return res.status(201).json(result);
    }
}