import { Request, Response } from "express";
import { jwtPayloadSchema } from "../../types";
import { prisma } from "../clients/prisma-client";
import { NotAManagerError, UnauthorizedError } from "../erros/AppError";
import { decrypt } from "../lib/jose";
export async function ManagerMiddleware(request: Request, response: Response, next:()=>void) {
  const token = request.headers.authorization?.replace(/^Bearer /, "");
  console.log(request.headers)
  if (!token) return response.status(401).send({ message: "Token missingvg" });
  try {
    const decodedToken = (await decrypt(token)) as jwtPayloadSchema;
    if (!decodedToken) throw new UnauthorizedError();
    const manager = await prisma.filial.findFirst({
      where: { id: decodedToken.filialId, managerId: decodedToken.id },
    });
    if (!manager) throw new NotAManagerError();
    request.user = decodedToken;
    next()
  } catch (error) {
    console.error(error);
    response.json({ message: "UNAUTHORIZED" }).status(401)
  }
}