import { Router } from "express";
import { GetallrecolhaController } from "../../modules/Recolha/GetallRecolhaController";

const getallrecolhacontroller = new GetallrecolhaController();

const getallrecolharoutes = Router();

getallrecolharoutes.get("/", getallrecolhacontroller.handle)

export{getallrecolharoutes}