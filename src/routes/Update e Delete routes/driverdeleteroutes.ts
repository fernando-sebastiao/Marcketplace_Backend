import { Router } from "express";
import geral from "../../all-update-and-delete/geral";

const driverdeleteroutes= Router();

driverdeleteroutes.delete("/driver-delete/:id_driver", geral.DeleteDriver);
export { driverdeleteroutes };
