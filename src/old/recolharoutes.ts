import { Router } from "express";
import geral from "../all-update-and-delete/geral";
import { CreateRecolhaController } from "./recolha/CreateRecolhaController";

const recolharoutes = Router();

const recolhacontroller = new CreateRecolhaController();

recolharoutes.post("/", recolhacontroller.handle);
recolharoutes.put("/", geral.UpdateRecolha);
export { recolharoutes };
