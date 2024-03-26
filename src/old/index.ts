import { Router } from "express";
import { updateroutes } from "../modules/Agent/updateroutes";
import { allclientIDroutes } from "../modules/Cliente/allclientIDroutes";
import { AuthDriverRoutes } from "../modules/Driver/auth-driver-controller";
import { alldriveridroutes } from "../modules/Driver/getalldriveridroutes";
import { allfilialidroutes } from "../modules/Filial/getallfilialIDroutes";
import { Manager } from "../modules/Manager/manager";
import { pdfDriverRoutes } from "../modules/Manager/pdfmake/pdfcontrollerDrivers";
import { pdffilialroutes } from "../modules/Manager/pdfmake/pdfcontrollerFiliais";
import { pdfmakeclienteroutes } from "../modules/Manager/pdfmake/pdfcontrollercliente";
import { allveiculoidroutes } from "../routes/Veiculo/getallveiculoIDroutes";
import { getallclienteroutes } from "./Getall/getallclienteroutes";
import { getalldriverroutes } from "./Getall/getalldriverroutes";
import { getallfilialroutes } from "./Getall/getallfilialroutes";
import { getallrecolharoutes } from "./Getall/getallrecolharoutes";
import { getallveiculoroutes } from "./Getall/getallveiculoroutes";
import { clientedeleteroutes } from "./Update e Delete routes/clientedeleteroutes";
import { driverdeleteroutes } from "./Update e Delete routes/driverdeleteroutes";
import { filialdeleteroutes } from "./Update e Delete routes/filialdeleteroutes";
import { managerdeleteroutes } from "./Update e Delete routes/menagerdeleteroutes";
import { recolhadeleteroutes } from "./Update e Delete routes/recolhadeleteroutes";
import { veiculosdeleteroutes } from "./Update e Delete routes/veiculodeleteroutes";
import { agentroutes } from "./agentroutes";
import { drivertoutes } from "./driverroutes";
import { filialroutes } from "./filialroutes";
import { managerroutes } from "./managerroutes";
import { allrecolhasroutes } from "./recolha/getallrecolhaIDroutes";
import { recolharoutes } from "./recolharoutes";
import { routesclientes } from "./routesclientes";
import { veiculoroutes } from "./veiculoroutes";

const routes = Router();
//Criar todos
routes.use("/filial", filialroutes);
// routes.use("/manager", managerroutes);
routes.use("/manager", Manager);
routes.use("/veiculos", veiculoroutes);
routes.use("/driver", drivertoutes);
routes.use("/recolha", recolharoutes);
routes.use("/cliente", routesclientes);
//Pegar todos
routes.use("/cliente-dados", getallclienteroutes);
routes.use("/driver-dados", getalldriverroutes);
routes.use("/filial-dados", getallfilialroutes);
routes.use("/recolha-dados", getallrecolharoutes);
routes.use("/veiculo-dados", getallveiculoroutes);
//Pegar pelo id
routes.use("/", allclientIDroutes); //cliente-dados/:id
routes.use("/", alldriveridroutes); //driver-dados/:id_driver
routes.use("/", allfilialidroutes); //filial-dados/:id_filial
routes.use("/", allmanageridroutes); //manager-dados/:id_manager
routes.use("/", allrecolhasroutes); //recolha-dados/:id_recolha
routes.use("/", allveiculoidroutes); //veiculo-dados/:id_recolha
//rota geral para trazer o id e o nome das filias
//Update e delete
routes.use("/cliente-update", routesclientes);
routes.use("/", clientedeleteroutes);
routes.use("/filial-update", filialroutes);
routes.use("/", filialdeleteroutes);
routes.use("/manager-update/", managerroutes);
routes.use("/", managerdeleteroutes);
routes.use("/driver-update", drivertoutes);
routes.use("/", driverdeleteroutes);
routes.use("/veiculo-update/", veiculoroutes);
routes.use("/", veiculosdeleteroutes);
routes.use("/recolha-update", recolharoutes);
routes.use("/", recolhadeleteroutes);
//Rotas dos Clientes
routes.use("/", agentroutes);
routes.use("/", updateroutes);
//Gerando PDF
routes.use("/", pdfmakeclienteroutes);
routes.use("/", pdffilialroutes);
routes.use("/", pdfDriverRoutes);
//links de auteticação
routes.use("/", authroutes);
routes.use("/", AuthDriverRoutes);
export { routes };
