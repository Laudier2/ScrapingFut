import * as puppeteer from 'puppeteer';

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

    const imgList = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('article img')
        const nodeList2 = document.querySelectorAll('article a')
        const nodeList3 = document.querySelectorAll('article a')

        const imgArray = [...nodeList]
        const titleArray = [...nodeList2]
        const linkArray = [...nodeList3]

        const img = imgArray.map( ({src}) => src)
        const title = titleArray.map( ({title}) => title)
        const links = linkArray.map( ({href}) => href)

        const list = [
            title,
            img,
            links
        ]

        return list
    })

    console.log(imgList)

    const questions = [
        "Qual o seu nome",
        "O que aprendi hoje?",
        "O que me deixou aborrecido? E o que eu poderia fazer para melhorar?", 
        "O que me deixou feliz hoje?",
        "Quantas pessoas ajudei hoje?"
    ]
    
    const ask = ( index = 0 ) => {
        process.stdout.write("\n\n" + questions[index] + " > ");
    } 
    
    ask()
    
    const answers = [`${imgList}`]

    process.stdin.on("data", data => {
        answers.push(data.toString().trim())
        if(answers.length < questions.length){
            //ask(answers.length)
            process.stdout.ask(answers.length)
        } else {
            console.log(answers)
            process.exit()
        }
    })
    
    process.on("exit", () => {
        console.log(`
            Excelente ${answers[0]},
            O que você aprendeu hoje foi:
            ${answers[1]}
     
            O que te aborreceu e você poderia melhorar foi: 
            ${answers[2]}
            
            O que deixou você feliz hoje foi:
            ${answers[3]}
            Quantas pessoas você ajudou ${answers[4]} hoje.
            
            Volte amanhã para novas reflexões!
        `)
    })


    await brawser.close()
}

Roda()