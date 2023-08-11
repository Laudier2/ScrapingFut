import * as puppeteer from 'puppeteer';
import fs from "fs"
import { exec } from 'child_process'
import path from "path"

const Roda = async () => {
    const brawser = await puppeteer.launch({
        //ignoreDefaultArgs: ['--disable-extensions'],
        //args: ['--no-sandbox', '--disable-setuid-sandbox']
        //headless: false,
        //headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await brawser.newPage()
    await page.goto("https://multicanais.fans/aovivohd/assistir-esportes-online/")

    const titleList = await page.evaluate(() => {
        const nodeList2 = document.querySelectorAll('article a')

        const titleArray = [...nodeList2]

        const title = titleArray.map( ({title}) => ({title}))

        //const list = `${title}, ${img}, ${links}`
           

        return (
            title
        )

    })

    const imgList = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('article img')

        const imgArray = [...nodeList]

        const img = imgArray.map( ({src}) => ({src}))

        //const list = `${title}, ${img}, ${links}`
           

        return (
            img
        )

    })

    const linkList = await page.evaluate(() => {
        
        const nodeList3 = document.querySelectorAll('article a')

        const linkArray = [...nodeList3]

        const links = linkArray.map( ({href}) => ({href}))

        //const list = `${title}, ${img}, ${links}`
           

        return (
            links
        )

    })

    console.log(imgList)

    console.log("===Instalando dependências===");

    exec(`rm img.json title.json link.json`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        console.log("==Tudo pronto para começar==")
    });

    setTimeout(() => {
        fs.writeFile('link.json', JSON.stringify(linkList, null, 2), err => {
            if(err) throw new Error('Somenting went wrong')
    
            console.log("well done")
        })
        fs.writeFile('title.json', JSON.stringify(titleList, null, 2), err => {
            if(err) throw new Error('Somenting went wrong')
    
            console.log("well done")
        })
        fs.writeFile('img.json', JSON.stringify(imgList, null, 2), err => {
            if(err) throw new Error('Somenting went wrong')
    
            console.log("well done")
        })
    },3000)
    
    await brawser.close()
    
}

Roda()