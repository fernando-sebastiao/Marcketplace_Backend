import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { AuthCooperativa } from "../../middleware/cooperativa";
import { Client } from "./client/client";
import { CooperativaUseCase } from "./cooperativa-usecase";
import { Driver } from "./driver/driver";
import { Recolha } from "./recolha/recolha";

export const authenticateSchema = z.object({
  email: z.string().email({ message: "Formato de email inválido" }),
  password: z.string(),
});
export type authenticateData = z.infer<typeof authenticateSchema>;

export async function Cooperativa(fastify: FastifyInstance) {
  const cooperativaUseCase = new CooperativaUseCase();
  fastify.addHook("preHandler", AuthCooperativa);
  fastify.get("/profile", async (req, reply) => {
    const user = req.user1;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      const profile = await cooperativaUseCase.profile({
        id: user.id
      });
      return reply.send(profile);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ message: "Erro ao buscar perfil" });
    }
  });
  fastify.register(Client, {
    prefix: "/clients",
  });
  //   fastify.register(Agent, {
  //     prefix: "/agents",
  //   });
    fastify.register(Recolha, {
     prefix:"/recolhas"
     })
  fastify.register(Driver, {
    prefix: "/drivers",
  });
  //   fastify.register(Settings, {
  //     prefix:"/settings"
  //   })
  //   fastify.register(Metrics, {
  //     prefix:"/metrics"
  //   })
}
