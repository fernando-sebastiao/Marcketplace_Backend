import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { FilialUseCase } from "./filial-usecase";


export async function Filial(fastify: FastifyInstance) {
  const filialUseCase = new FilialUseCase();
  fastify.get("/", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(
        await filialUseCase.find()
      );
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  });
  fastify.delete("/:id", async (req, reply) => {
    const { key } = z
      .object({
        key: z.string(),
      })
      .parse(req.query);
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.params);
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      await filialUseCase.delete({
      id:user.id,
      key,
      filialId:user.filialId
      });
      return reply
        .code(200)
        .send({ message: "Motorista deletado com sucesso" });
    } catch (error) {
      console.error(error);
      reply.send(error);

    }
  });
  fastify.get("/:id", async (req, reply) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.params);
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(
        await filialUseCase.findById({ id, filialId: user.filialId })
      );
    } catch (error) {
      console.error(error);
      reply.send(error);

    }
  });
  
}