import { Router } from "express";
import { GetallClienteController } from "../../modules/Cliente/GetallClienteController";


const getallclientecontroller = new GetallClienteController();

const getallclienteroutes = Router();

getallclienteroutes.get("/", getallclientecontroller.handle)

export {getallclienteroutes}