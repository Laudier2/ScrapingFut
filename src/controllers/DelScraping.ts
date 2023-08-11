import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class controllerDelete {
    async handle(request: Request, response: Response) {
        const id = request.params.id;

        const idExists = await prisma.listaFut.findUnique({
            where: {
                id: id
            }
        })

        if (!idExists) {
            return response.status(400).json({
                msg: `Esse id: ${id} não existe mais no database`
            })
        }

        const user = await prisma.listaFut.delete({
            where: {
                id: id
            }
        })
        console.log({ msg: "Jogo deletado com sucesso!", user })
        return response.json({ msg: "Jogo deletado com sucesso!", user });
    }
}

export class controllerDeleteTodos {
    async handle(request: Request, response: Response) {
        //const id = request.params.id;

        //const { title } = request.body;

        const deleteUsers = await prisma.listaFut.deleteMany({
            where: {
                title: {
                    contains: 'Assistir',
                },
            },
        })

        return response.json({ msg: "Jogo deletado com sucesso!", deleteUsers });
    }
}
