import { Router } from "express";
import geral from "../all-update-and-delete/geral";
import { CreateUseDriverController } from "../modules/Driver/CreateUseDriverController";

const drivertoutes = Router();

const createusedrivercontroller = new CreateUseDriverController();

drivertoutes.post("/", createusedrivercontroller.handle)
drivertoutes.put("/", geral.UpdateDriver);
export { drivertoutes };
