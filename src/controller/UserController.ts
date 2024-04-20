import { hash } from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createUser = async (req: Request, res: Response) => {
  const { name, password, email, acessname } = req.body;

  const ifuseremail = await prisma.user.findUnique({ where: { email } });
  const ifAcessname = await prisma.acess.findUnique({
    where: {
      name: acessname,
    },
  });
  if (!ifAcessname) {
    return res.status(400).json({ message: "This acess level doen't exist" });
  }
  if (ifuseremail) {
    return res
      .status(400)
      .json({ message: "This user already exists, try other user!" });
  }
  const salt = 8;
  const hashPassword = await hash(password, salt);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      userAcess: {
        create: {
          Acess: {
            connect: {
              name: acessname,
            },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
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
  return res.status(201).json({ massage: "Created User", user });
};
export const getallUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      store: {
        select: {
          name: true,
        },
      },
      userAcess: {
        select: {
          Acess: {
            select: { name: true },
          },
        },
      },
    },
  });
  return res.status(200).json({ massage: "Show Users", Error: false, user });
};

export const DeleteAllUser = async (req: Request, res: Response) => {
  const user = await prisma.user.deleteMany();

  return res.status(200).json({ massage: "Deleted Users", Error: false, user });
};
export const DeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ifuser = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });

  if (!ifuser) {
    res.status(400).json({ message: "Usuário não encontrado"! });
  }
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return res.status(200).json({ massage: "Deleted User", Error: false, user });
};
export const UpdateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password } = req.body;
  const ifuser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!ifuser) {
    res.status(400).json({ message: "Usuário não encontrado"! });
  }
  const usuário = req.user;
  if (id != usuário.id) {
    res.status(400).json({
      message: "Usuário não compatíveis, verifique o ID!",
    });
  }

  const user = await prisma.user.update({
    where: {
      id: usuário.id,
    },
    data: {
      email,
      password,
    },
  });

  return res.status(200).json({ massage: "Updated User", Error: false, user });
};
