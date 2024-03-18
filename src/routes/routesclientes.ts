import { Router } from "express";
import geral from "../all-update-and-delete/geral";
import { CreateClienteController } from "../modules/Cliente/CreateClienteController";

const routesclientes = Router();

const createclientecontroller = new CreateClienteController();

routesclientes.post("/", createclientecontroller.handle);
routesclientes.put("/", geral.UpdateCliente);
export { routesclientes };
