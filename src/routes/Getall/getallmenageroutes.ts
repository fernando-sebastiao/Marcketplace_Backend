import { Router } from "express";
import { GetallmanagerController } from "../../modules/Manager/GetallmenagerController";


const getallmanageroutes = Router();

const getallmanagercontroller = new GetallmanagerController();

getallmanageroutes.get("/", getallmanagercontroller.handle);

export { getallmanageroutes };

