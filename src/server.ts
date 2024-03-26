import fastify from "fastify";
// import { Finds } from "./routes/finds/finds";
// import { Manager, authenticateSchema } from "./routes/manager/manager";
// import { ManagerUseCase } from "./routes/manager/manager-usecase.ts";
import { prisma } from "./clients/prisma-client";
import { seedRecolhas } from "./clients/seedRecolhas";
import { Finds } from "./old/finds/finds";
import { authenticateSchema, Manager } from "./routes/manager/manager";
import { ManagerUseCase } from "./routes/Manager/manager-useCase";
const app = fastify();

app.register(Finds, {
  prefix: "/find",
});

app.register(Manager, {
  prefix: "/manager",
});

app.post("/manager/authenticate", async (req, reply) => {
  const managerUseCase = new ManagerUseCase();
  const { email, filialId, password } = authenticateSchema.parse(req.body);
  try {
    return reply.send(
      await managerUseCase.authenticate({
        email,
        filialId,
        password,
      })
    );
  } catch (error) {
    console.error(error);
    reply.code(404).send(error);
  }
});

app.get("/managers", async (req, reply) => {
  try {
    return reply.send(
      await prisma.filial.findMany({
        select: {
          name: true,
          manager: {
            select: {
              email: true,
              password: true,
            },
          },
        },
      })
    );
  } catch (error) {
    console.error(error);
    reply.code(404).send(error);
  }
});

setInterval(async () => {
  await seedRecolhas();
}, Math.floor(Math.random() * 500000));
app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 1234,
  })
  .then(() => {
    console.log(`🔥 HTTP server running at http://localhost:1234`);
  });
