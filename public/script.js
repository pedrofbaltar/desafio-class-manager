// const modalOverlay = document.querySelector('.modal-overlay'); // selecionando a classe '.modal-overlay'
const cards = document.querySelectorAll('.card'); // selecionando todos os elementos com a classe 'card'

for (let card of cards) {
    card.addEventListener('click', function() { // esperando o evento clique para executar a função, quando isso acontecer:
        
        const videoId = card.getAttribute('id') // pegando todos os elementos com atributo id dentro dos cards

        // irá adicionar a classe 'active' o que irá aparecer o modal na tela
        // modalOverlay.classList.add('active')

        // modalOverlay.querySelector('iframe').src = `https://www.youtube.com/embed/${videoId}` // trocando o id da url de cada vídeo

        window.location.href = `/video?id=${videoId}`
    }) 
}

// closeModal.addEventListener('click', function() {
//     modalOverlay.classList.remove('active')
// })

// document.querySelector('.close-modal').addEventListener('click', function() { // quando clicar no 'x' para fechar
//     modalOverlay.classList.remove('active') // irá remover a classe 'active', o que irá fechar o modal
//     modalOverlay.querySelector('iframe').src = "" // para o vídeo não continuar rolando quando fechar o modal, assim que fechar a url ficará vazia
// })

// modalOverlay.querySelector('iframe').src = "https://www.youtube.com/embed/UftSB4DaRU4" // Buscando o iframe dentro do modalOverlay

// ANOTAÇÕES

// document.querySelector('') Seleciona um elemento pelo id, class, ou até mesmo pelo nome do elemento (ex: body)

// document.querySelectorAll('') Seleciona TODOS os elementos existentes com a mesma classe por exemplo, basta colocar o nome apenas uma vez

// addEventListener é uma função que seria como um ouvidor de eventos que registra o evento que colocarmos em seu parâmetro.

// classList.add() server para adicionar uma nova classe pelo JS.

// classList.remove() remove uma classe pelo JS.