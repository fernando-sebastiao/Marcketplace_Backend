import { Router } from "express";
import { CreateAgentController } from "../modules/Agent/createagentcontroller";

const agentroutes = Router();

const createagent = new CreateAgentController();

agentroutes.post("/add-agent", createagent.handle);

export { agentroutes };

