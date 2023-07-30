import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const {
      title,
      video,
      imagem
    } = request.body;

    if (
      typeof title === 'number' ||
      typeof imagem === 'number' ||
      typeof video === 'number'
    ) {
      return response.status(500).json({
        msg: `Algum campo estar em número! Lembre-se que, todos os campos tem estar em string ok!`
      })
    }

    if (
      typeof title === 'number' ||
      typeof imagem === 'number' ||
      typeof video === 'number'
    ) {
      return response.status(500).json({
        msg: `Algum campo esta faltando! Verifique novamente!`
      })
    }

    const product = await prisma.listaFut.create({
      data: {
        title,
        video,
        imagem
      },
    });

    return response.status(200).json(product);
  }
}
