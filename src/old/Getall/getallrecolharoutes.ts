import { Router } from "express";
import { GetallrecolhaController } from "../recolha/GetallRecolhaController";

const getallrecolhacontroller = new GetallrecolhaController();

const getallrecolharoutes = Router();

getallrecolharoutes.get("/", getallrecolhacontroller.handle);

export { getallrecolharoutes };
