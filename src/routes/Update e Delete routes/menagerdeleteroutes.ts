import { Router } from "express";
import geral from "../../all-update-and-delete/geral";

const managerdeleteroutes = Router();

managerdeleteroutes.delete("/manager-delete/:id_manager", geral.DeleteManager);

export { managerdeleteroutes };

