import { Router } from "express";
import geral from "../all-update-and-delete/geral";
import { CreateUseManagerController } from "../modules/Manager/CreateUseMenagerController";
import { ManagerMiddleware } from "../middleware/manager";
import { GetallmanagerController } from "../modules/Manager/GetallmenagerController";

const getallmanagercontroller = new GetallmanagerController();
const createusemanagercontroller = new CreateUseManagerController();
const managerroutes = Router();

// managerroutes.use(ManagerMiddleware)
// managerroutes.post("/", createusemanagercontroller.handle)
managerroutes.put("/", geral.UpdateManager);
managerroutes.get("/", getallmanagercontroller.handle);


export { managerroutes };

