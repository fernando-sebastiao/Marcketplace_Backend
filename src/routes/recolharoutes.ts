import { Router } from "express";
import geral from "../all-update-and-delete/geral";
import { CreateRecolhaController } from "../modules/Recolha/CreateRecolhaController";

const recolharoutes = Router();

const recolhacontroller = new CreateRecolhaController();

recolharoutes.post("/", recolhacontroller.handle);
recolharoutes.put("/", geral.UpdateRecolha);
export { recolharoutes };
