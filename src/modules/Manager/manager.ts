import { Router,Request, Response } from "express";
import { GetallmanagerController } from "./GetallmenagerController";
import { CreateUseManagerController } from "./CreateUseMenagerController";
import { ManagerMiddleware } from "../../middleware/manager";
import { ManagerUseCase } from "./manager-useCase";
import { UnauthorizedError } from "../../erros/AppError";

const managerUseCase=new ManagerUseCase()
const Manager = Router();

Manager.use(ManagerMiddleware)
Manager.use("/recolhas", async (req:Request, res:Response) => {
    const user=req.user
    if(!user)throw new UnauthorizedError()
    try {
const recolhas= await managerUseCase.recolhas({ filialId:user.filialId})
       return res.json(
recolhas
        )
    } catch (error) {
       return res.send(error)
    }
})
Manager.use("/profile", async (req:Request, res:Response) => {
    const user=req.user
    if(!user)throw new UnauthorizedError()
    try {
const recolhas= await managerUseCase.profile({ id:user.id})
       return res.json(
recolhas
        )
    } catch (error) {
       return res.send(error)
    }
})


export { Manager };

