import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class ControllerFind {
    async handle(request: Request, response: Response) {

        const product = await prisma.listaFut.findMany({});

        return response.json(product);
    }
}

export class controllerProductCategory {
    async handle(request: Request, response: Response) {
        const { id } = request.body;

        const User = await prisma.listaFut.findMany({
            where: {
                id: id
            }

        });

        return response.json(User);
    }
}

export class controllerProductId {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const userExists = await prisma.listaFut.findUnique({
            where: {
                id: id
            }
        })

        if (!userExists) {
            return response.status(400).json({
                msg: `Esse id: ${id} não estar vinculado a nem uma produto, tente outro!`
            })
        }
    }
} 