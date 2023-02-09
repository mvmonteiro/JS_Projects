let listaDeItens = []
let itemEditar

const form = document.getElementById("form-itens")          // pegando o elemento form pelo id dele
const itensInput = document.getElementById("receber-item")  // pegando o elemento onde se escreve em cima do botão
const ulComprar = document.getElementById("lista-de-itens") // referenciando uma variável para a lista de itens que devem ser comprados
const ulComprados = document.getElementById("itens-comprados") // referenciando uma variável para a lista de itens que foram comprados
const listaRecuperada = localStorage.getItem('listaDeItens') // método que pega as informações do local storage - aspas simples por ser do JSON 

    // Função para armazenar os dados da lista no armazenamento local web (para que os dados continuem persistentes quando a página atualiza)
function atualizaLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens)) // O JSON é um arquivo que guarda dados do tipo string, o mesmo que o local
} // storage aceita receber -> stringfy transforma todos os dados em string -> passa-se para o localStorage com o setItem a listaDeItens

    // Função que recupera os itens no armazenamento local e faz o contato deles com o JS
if(listaRecuperada) {    // caso houver algum elemento a condicional será true
    listaDeItens = JSON.parse(listaRecuperada) // oposto do stringfy -> transforma elementos do JSON para o padrão JS
    adicionarItem() // depois de recuperar as informações, usa-se essa função para adiciona-los de novo na tela
}
else {
    listaDeItens = [] // mantém a lista vazia caso não tenha sido escrito nada
}

form.addEventListener("submit", function(evento) {
    evento.preventDefault()
    salvarItem()
    adicionarItem()
    itensInput.focus()
}) // submit vem do tipo do botão e o evento seria o click no botão (faz com que não se perca a informação que o usuário escreveu)

// função que salva os itens adicionados pelo usuário na lista listaDeItens
function salvarItem() {
    const comprar = itensInput.value // atribui a uma var tudo o que for digitado pelo usuário no campo de escrever
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprar.toUpperCase()) // uma variável que é uma "função" que usa a extensão some
    // (varre toda a lista), cria um "elemento" e atribui a esse elemento o "elemento.valor" que na verdade seria cada um dos itens do listaDeItens e 
    // então depois compara cada valor com o "comprar" que é onde é armazenado cada item inserido pelo usuário.
    // toUpperCase transforma todas as strings em maiusculas para a comparação por conta do case sensitive que permite escrever dois itens iguais porém
    // mudando o tamanho de uma das letras

    if(checarDuplicado) {   // Caso o booleano é verdadeiro então aquele item já existe na lista
        alert("O item que você tentou adicionar já existe!")
    }
    else{
        listaDeItens.push({             // push coloca na lista de forma com que os itens não sejam substituidos e sim sejam indexados
            valor: comprar,             // variável valor vai receber cada item adicionado pelo usuário
            checar: false               // variável para trabalhar no estado true or false da checkbox dos itens a serem comprados
        })
    }

    itensInput.value = ''               // Depois do usuário escrever no no bloco de texto, o texto some
}


    // Função que adiciona cada item da lista na check list de produtos a comprar (na tela)
function adicionarItem() {
    ulComprar.innerHTML = ''                         // Obtém-se o HTML 
    ulComprados.innerHTML = ''

    listaDeItens.forEach((elemento, index) => {     // forEach - itera em todos os elementos da lista (pegando qual o elemento e o índice)
        if(elemento.checar) {                       // Caso verdadeiro (checkbox marcada) o elemento vai para lista de itens já comprados
            ulComprados.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" checked class="is-clickable" />  
                        <span class="itens-comprados is-size-5">"${elemento.valor}"</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>`

        }                                           // Caso falso, o item vai para a lista de itens que devem ser comprados
                                                    // utilização do number() para conseguir fazer uma comparação forte com ===
        else {
                ulComprar.innerHTML += `                    
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" class="is-clickable" />
                        <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemEditar) ? 'disabled' : ''}></input>
                    </div>
                    <div>
                        ${index === Number(itemEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>`                                  // Altera-se o HTML da lista de compras para adicionar o elemento e o índice
            }
    })                                              
        

        // função para passar os itens de uma lista para outra
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')     // variável que pega checkbox do html
    inputsCheck.forEach(i => {                                                  // iteração em todos os checkbox
        i.addEventListener('click', (evento) => {                               // listener no evento click de todas checkbox
            const indiceElemento = evento.target.parentElement.parentElement.getAttribute('data-value')     // pega o índice do elemento clicado
            listaDeItens[indiceElemento].checar = evento.target.checked         // faz com que ao clicar na checkbox ela mude o estado para true ou false
            adicionarItem()                                                     // função que faz com que o item vai de uma lista para outra
            console.log( listaDeItens[indiceElemento].checar)                   
        })
    })


        // função para apagar o item de alguma das listas
    const deletarObjeto = document.querySelectorAll( ".deletar" )
    deletarObjeto.forEach(i => {                                                // iteração em todos os checkbox
        i.addEventListener('click', (evento) => {                               // listener no evento click de todas checkbox
            const indiceElemento = evento.target.parentElement.parentElement.getAttribute('data-value')     // pega o índice do elemento clicado  
            listaDeItens.splice(indiceElemento, 1)       // splice possibilita deletar objetos ou substituir por outros 
            adicionarItem()          
        })
    })


        // função para editar algum dos itens já colocados na lista a comprar
    const editarItem = document.querySelectorAll(".editar")
    editarItem.forEach(i => {                                                   // iteração em todos os checkbox
        i.addEventListener('click', (evento) => {                               // listener no evento click de todas checkbox
            itemEditar = evento.target.parentElement.parentElement.getAttribute('data-value')     // pega o índice do elemento clicado  
            adicionarItem()
        })
    })

    atualizaLocalStorage()                                                      // Salvar os itens listados toda vez que o "adicionar" for executado 

}


        // função para salvar a edição de algum item da lista
function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemEditar}"] input[type="text"]`)   // pega no html o indice do item que será editado
    listaDeItens[itemEditar].valor = itemEditado.value                                     // atribui o item editado à variável resposável pela lista
    itemEditar = -1        // faz resetar o valor atribuido para o "itemEditar", assim ele não fica com algum indice atribuido antes
    adicionarItem()
    console.log(listaDeItens)                                         
}






