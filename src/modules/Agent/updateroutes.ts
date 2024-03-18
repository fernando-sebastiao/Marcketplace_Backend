import { Router } from "express";
import allagent from "./allagent";

const updateroutes = Router()

updateroutes.put("/update-agent", allagent.UpdateAgente);

export { updateroutes };

