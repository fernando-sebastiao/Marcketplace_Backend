import { Router } from "express";
import geral from "../all-update-and-delete/geral";
import { CreateUseFilialController } from "../modules/Filial/CreateUseFilialController";

const filialroutes = Router();

const createuserfililcontroller = new CreateUseFilialController();

filialroutes.post("/", createuserfililcontroller.handle);
filialroutes.put("/", geral.UpdateFilial);
export { filialroutes };
