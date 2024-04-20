import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/prisma";

interface DecodedToken {
  userId: string;
}

export function authMiddleware(permissions?: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" });
    }
    const token = authHeader.substring(7);

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("Chave secreta não fornecida!");
    }

    try {
      const decodedToken = verify(token, JWT_SECRET) as DecodedToken;
      req.user = { id: decodedToken.userId };
      if (permissions) {
        const user = await prisma.user.findUnique({
          where: {
            id: decodedToken.userId,
          },
          include: {
            userAcess: {
              select: {
                Acess: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });
        const userPermissions =
          user?.userAcess.map((name) => name.Acess?.name) ?? [];
        const hasPermissions = permissions.some((p) =>
          userPermissions.includes(p)
        );

        if (!hasPermissions) {
          return res.status(403).json({ message: "Permissão negada" });
        }
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Token invalido!" });
    }
  };
}
