import express, { Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes"; // Certifique-se de que o caminho está correto

const app = express();

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API",
      version: "1.0.0",
      description: "A simple Express API",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
    ],
  },
  apis: ["./src/routes.ts"], // Certifique-se de que o caminho está correto
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(router);

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello world" });
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
