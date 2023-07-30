import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as puppeteer from 'puppeteer';

const url = "https://multicanais.fans/aovivohd/assistir-esportes-online/"

const prisma = new PrismaClient()

export class ControllerPost {
    async handle(request: Request, response: Response) {
        const { title, imagem, video } = request.body;

        if (
            typeof title === 'number' ||
            typeof imagem === 'number' ||
            typeof video === 'number'
        ) {
            return response.status(500).json({
                msg: `Algum campo estar em número! 
          Lembre-se que, todos os campos tem estar em string ok!
          Ou o id esta errado, verifique novamente
          `
            })
        }

        if (
            typeof title === 'undefined' ||
            typeof imagem === 'undefined' ||
            typeof video === 'undefined'
        ) {
            return response.status(500).json({
                msg: `Algum campo esta faltando! Verifique novamente!
          Ou o id esta errado, verifique novamente`
            })
        }

        const brawser = await puppeteer.launch({
            //ignoreDefaultArgs: ['--disable-extensions'],
            //args: ['--no-sandbox', '--disable-setuid-sandbox']
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
        const page = await brawser.newPage()

        await page.goto(url, { timeout: 0 })

        const links = await page.$$eval('.entry-title > a', el => el.map(link => link.href))
        const imgs = await page.$$eval('.entry-image > a > img', imgs => imgs.map(img => img.getAttribute('src')));
        const title2 = await page.$$eval(".entry-title", (elements) => { return elements.map((el) => el.textContent.trim()) })


        const data2 = {
            title: title2,
            link2: links,
            img2: imgs
        }

        console.log(data2)

        /*const PostFut = await prisma.post.create({
            data: {
                title: `${data2.title2}`,
                imagem: `${data2.img2}`,
                video: `${data2.link2}`
            }
        });*/

        for (let i = 12; i < data2.img2.length; i++) {
            const img = data2.img2[i]
            const t = data2.title[i]
            const v = data2.link2[i]


            const PostFut = await prisma.listaFut.create({
                data: {
                    title: `${t}`,
                    imagem: `${img}`,
                    video: `${v}`
                }
            });
            console.log(i)
            //return response.json(PostFut)
            await brawser.close()
            //return response.json(PostFut);

        }

        //return response.json(PostFut);

    }
}