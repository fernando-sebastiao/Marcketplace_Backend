import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { prisma } from "./database/prisma";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
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
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }
    const ifPasswordValid = await compare(password, user.password);
    if (!ifPasswordValid) {
      return res.status(400).json({ message: "Senha incorreta!" });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("Chave sereta não fornecida!");
    }

    const token = sign(
      {
        userId: user.id,
        roles: user.userAcess.map((role) => role.Acess?.name),
      },
      JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "5d",
      }
    );
    const userlogin = {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
    return res.status(200).json({ userlogin });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
