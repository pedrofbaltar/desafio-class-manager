const express = require('express') // Aqui estamos importando uma dependência, no caso o express o 'require' é resposável por pegar arquivos externos
const nunjucks = require('nunjucks') // Importando a dependência 'nunjucks'

const server = express() // Criando o servidor
const videos = require("./data") // Chamando vídeos do data.js, quando queremos chamar um arquivo que não foi instalado pelo npm, colocamos "./" (ponto barra e nome do arquivo), "./" referencia à raiz do projeto

server.use(express.static('public'))

server.set('view engine', 'njk') // Configurando template engine

nunjucks.configure('views', {
    express: server, // Opção é pelo express
    autoescape: false, // Para o nunjucks não segurar códigos HTML nas variáveis
    noCache: true
})   // Configurando     o caminho/pasta, no caso a pasta é a pasta views

server.get('/', (req, res) => { // Depois que o servidor pegar a '/' vai executar uma função, se o usuário enviar alguma coisa vai fazer um request (req), o servidor vai enviar uma resposta, um respond (res)
    const about = {
        avatar_url: "https://avatars0.githubusercontent.com/u/61912191?s=460&u=5664bb28b99e9285db23ce02db8ecf293a21108d&v=4",
        name: "Pedro Baltar",
        role: "Estudate - Programador",
        description: "Programador full-stack, focado em aprender cada vez mais.",
        links: [
            { name: "Github", url: "https://github.com/pedrofbaltar/" },
            { name: "Twitter", url: "https://twitter.com/baltarrpedro/" },
            { name: "LinkedIn", url: "https://github.com/pedrofbaltar/" }
        ]
    }
    return res.render('about', { about }) // por ter o mesmo nome eu posso escrever apenas uma vez mas é a mesma coisa que fazer { about: about }
    // return res.render('about', { about: about }) // o servidor está respondendo (res) a redenrerização (render) de alguma view (index) -> não precisa colocar .html pois a config já fará isso
    // return res.send('Hello, world!') // o servidor está respondendo (res) enviando uma mensagem (send)
}) // server.get faz o server 'pegar' a rota principal ('/' = principal)

server.get('/portfolio', (req, res) => { // Fazendo a mesma coisa que fizemos com o index mas agora para o arquivo portfolio
    return res.render('portfolio', { itens: videos }) // criando uma variável chamada itens dentro do arquivo 'portfolio' essa variável se refere ao data.js que possui um array de objetos com as informações sobre os vídeos
})

server.get("/video", (req, res) => {
    const id = req.query.id 

    const video = videos.find((video) => {
        // if (video.id == id) {
        //        return true
        // }
        
        return video.id == id // É a mesma coisa que fazer utilizando isso, é apenas um jeito de deixar o código mais limpo
    })

    if (!video) {
        return res.send('Video not found!')
    }

    return res.render('video', { item: video })
})

server.listen(5000, () => {
    console.log('server is running 🚀') // callback 
}) // O servidor vai ficar ouvindo uma porta, no caso a porta 5000. E depois que 'ouvir' a porta 5000 irá executar um callback, um resposta. No caso, fará um console.log()