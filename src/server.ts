import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { AppError } from "./erros/AppError";
import { authroutes } from "./modules/Manager/authcontroller";
import { routes } from "./routes";

const app = express()
app.use(express.json());
app.use(routes)
app.use(authroutes)
app.use((err: Error, request: Request, response: Response, next: NextFunction)=> {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }
    return response.status(500).json({
        status: "error",
        message: `Erro no servidor interno - ${err.message}`
    });
})

app.listen(1234, ()=> console.log("Servidor rodando na porta 1234"));