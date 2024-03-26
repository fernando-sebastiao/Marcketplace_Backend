import { Router } from "express";
import geral from "../../all-update-and-delete/geral";

const clientedeleteroutes = Router();

clientedeleteroutes.delete("/cliente-delete/:id", geral.DeleteClient);

export { clientedeleteroutes };
