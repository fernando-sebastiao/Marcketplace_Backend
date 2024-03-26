import type { FastifyReply, FastifyRequest } from "fastify";
import { NotAAGent, UnauthorizedError } from "../erros/AppError";
import { decrypt } from "../lib/jose";
import { jwtPayloadSchema } from "../../types";
import { prisma } from "../clients/prisma-client";
export async function AuthAgent(req: FastifyRequest, rep: FastifyReply) {
  const token = req.headers.authorization?.replace(/^Bearer /, "");
  if (!token) return rep.code(401).send({ message: "Token missing" });
  try {
    const decodedToken = (await decrypt(token)) as jwtPayloadSchema;
    if (!decodedToken) throw new UnauthorizedError();
    const agent = await prisma.filial.findUnique({
      where: { id: decodedToken.filialId, agents:{
        some:{
          id: decodedToken.id
        }  
      } },
    });
    if (!agent) throw new NotAAGent();
    req.user = decodedToken;
  } catch (error) {
    console.error(error);
    rep.code(401).send({ message: "UNAUTHORIZED" });
  }
}