import type { FastifyInstance } from "fastify";
import { MetricsUseCase } from "./metrics-usecase";

export async function Metrics(fastify: FastifyInstance) {
  const metricsUserCase = new MetricsUseCase();
  fastify.get("/popular-drivers", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(
        await metricsUserCase.popularDrivers({
          filialId: user.filialId,
        })
      );
    } catch (error) {
      console.error(error);
      reply.code(500).send({ message: "Erro ao buscar motoristas populares" });
    }
  });
  fastify.get("/big-chart", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(
        await metricsUserCase.bigChart({
          filialId: user.filialId,
        })
      );
    } catch (error) {
      console.error(error);
      reply.code(500).send({ message: "Erro ao buscar big chart" });
    }
  });
  fastify.get("/month-recolhas-amount", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(
        await metricsUserCase.mothAmount({
          filialId: user.filialId,
        })
      );
    } catch (error) {
      console.error(error);
      reply.code(500).send({ message: "Erro ao buscar month recolhas amount" });
    }
  });
  fastify.get("/day-recolhas-amount", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(
        await metricsUserCase.dayRecolhasAmount({
          filialId: user.filialId,
        })
      );
    } catch (error) {
      console.error(error);
      reply.code(500).send({ message: "Erro ao buscar day recolhas amount" });
    }
  });
  fastify.get("/month-canceled-recolhas-amount", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(
        await metricsUserCase.monthCanceledRecolhasAmount({
          filialId: user.filialId,
        })
      );
    } catch (error) {
      console.error(error);
      reply
        .code(500)
        .send({ message: "Erro ao buscar month canceled recolhas amount" });
    }
  });
  fastify.get("/month-payment-amount", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
    //   return reply.send(
    //     await metricsUserCase.paymentAmount({
    //       filialId: user.filialId,
    //     })
    //   );
    } catch (error) {
      console.error(error);
      reply.code(500).send({ message: "Erro ao buscar payment amount" });
    }
  });
}