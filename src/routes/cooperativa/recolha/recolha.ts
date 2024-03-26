import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { RecolhaUseCase } from "./recolha-usecase";

export async function Recolha(fastify: FastifyInstance) {
  const recolhaUseCase = new RecolhaUseCase();
  fastify.get("/", async (req, reply) => {
    const user = req.user1;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(await recolhaUseCase.find());
    } catch (error) {
      console.error(error);
      reply.code(500).send({ message: "Erro ao buscar recolhas" });
    }
  });
  fastify.get("/:id", async (req, reply) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.params);
    const user = req.user1;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(
        await recolhaUseCase.findById({
          recolhaId: id,
        })
      );
    } catch (error) {
      reply.code(500).send(error);
    }
  });
  fastify.delete("/:id", async (req, reply) => {
    const user = req.user1;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.params);
    const { key } = z
      .object({
        key: z.string(),
      })
      .parse(req.body);
    try {
      await recolhaUseCase.delete({
        id: user.id,
        key,
        clintId: id,
      });
      return reply.code(200).send("Recolha deletada com sucesso");
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  });
}
