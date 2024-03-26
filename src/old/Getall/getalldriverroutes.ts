import { Router } from "express";
import { GetallDriverController } from "../../modules/Driver/GetallDriverController";

const getalldriverroutes = Router();

const getalldrivercontroller = new GetallDriverController();

getalldriverroutes.get("/", getalldrivercontroller.handle)

export{getalldriverroutes}