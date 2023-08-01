import * as puppeteer from 'puppeteer';

const url = "https://multicanais.fans/aovivohd/assistir-esportes-online/"


const Screping = async () => {
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
    const title = await page.$$eval(".entry-title", (elements) => { return elements.map((el) => el.textContent.trim()) })


    const data = {
        title: title,
        link: links,
        img: imgs
    }

    console.log(data)

    setTimeout((
        await brawser.close()
    ), 35000)


}

Screping()

export { Screping }
