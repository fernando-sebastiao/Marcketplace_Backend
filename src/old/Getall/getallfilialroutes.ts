import { Router } from "express";
import { GetallfilialConntroller } from "../../modules/Filial/GetallfilialController";

const getallfiliacontroller = new GetallfilialConntroller();

const getallfilialroutes = Router();

getallfilialroutes.get("/", getallfiliacontroller.handle)

export{getallfilialroutes}