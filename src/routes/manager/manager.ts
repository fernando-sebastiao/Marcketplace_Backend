import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { ManagerUseCase } from "./manager-useCase";
import { Client } from "./client/client";
import { Recolha } from "./recolha/recolha";
import { Driver } from "./driver/driver";
import { Settings } from "./settings/settings";
import { Metrics } from "./metrics/metrics";
import { Agent } from "./agents/agent";
import { AuthManager } from "../../middleware/manager";

export const authenticateSchema = z.object({
  email: z.string().email({ message: "Formato de email inválido" }),
  filialId: z.string(),
  password: z.string(),
});
export type authenticateData = z.infer<typeof authenticateSchema>;

export const filialStatuSchema = z.object({
  status: z.enum(["aberta", "fechado"]),
});
export type filialStatusData = z.infer<typeof filialStatuSchema>;
export async function Manager(fastify: FastifyInstance) {
  const managerUseCase = new ManagerUseCase();
  fastify.addHook("preHandler", AuthManager);
  fastify.get("/profile", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      const profile = await managerUseCase.profile({
        id: user.id,
        filialId: user.filialId,
      });
      return reply.send(profile);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ message: "Erro ao buscar perfil" });
    }
  });
  fastify.post("/update-status", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    const { status } = filialStatuSchema.parse(req.body);
    try {
      const up = await managerUseCase.updateFilialStatus({
        filial: { status },
        id: user.id,
        filialId: user.filialId,
      });
      if (!up) {
        throw new Error("Erro ao atualizar status da filial");
      }
      return reply.code(200).send();
    } catch (error) {
      console.error(error);
      reply.code(500).send({ message: "Erro ao atualizar status da filial" });
    }
  });
  fastify.register(Client, {
    prefix: "/clients",
  });
  fastify.register(Agent, {
    prefix: "/agents",
  });
  fastify.register(Recolha, {
    prefix:"/recolhas"
  })
  fastify.register(Driver, {
    prefix:"/drivers"
  })
  fastify.register(Settings, {
    prefix:"/settings"
  })
  fastify.register(Metrics, {
    prefix:"/metrics"
  })
}