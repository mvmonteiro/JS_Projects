const form = document.getElementById("novoItem");                // var que pega todo o objeto formulário do html
const lista = document.getElementById('lista');                  // var que pega toda o objeto lista (ul) do html
const itens = JSON.parse(localStorage.getItem("itens")) || []    // caso exista o localStorage, o mesmo será puxado, senão, criará um array vazio
            // uso do JSON.parse() para tranforma os dados de lidos do localStorage no formato string para JS novamente

    // monitoramento do click no submit do navegador
form.addEventListener("submit", (evento) => {       // variável "evento" que armazena todas informações relacionadas à aquele click
    evento.preventDefault();                        // prevenção do comportamento padrão da página -> possibilita o acesso aos dados

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const itemAtual = {          // objetos com as informações que vão ser usadas
        "nome" : nome.value,
        "quantidade" : quantidade.value
    }

    const existe = itens.find( elemento => elemento.nome === nome.value);

    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }
    else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1].id) + 1 : 0;
        criaElemento(itemAtual);     // chamada da função que cria um novo elemento
                                     // com seus devidos parâmetros

        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = "";          // fazendo com que o input nome receba vazio depois do click em submit
    quantidade.value = "";    // fazendo com que o input quantidade receba vazio depois do click em submit                                                                                                
})

    // função que cria o novo elemento dentro do html
function criaElemento (item) {
    const novoItem = document.createElement('li');          // var que cria a tag li
    novoItem.classList.add("item");                         // adiciona uma classe="item"

    const numeroItem = document.createElement('strong')     // var que cria a tag strong
    numeroItem.innerHTML = item.quantidade;                      // o texto dentro da tag strong é igual à um dos parâmetros da função
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);                       // acrescenta a nova tag strong pra dentro da tag li
    novoItem.innerHTML += item.nome;                        // o texto dentro da tag li é igual à um dos parâmetros da função

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);                            // acrescenta a nova tag li pra dentro da tag mais de fora (ul)
                                                            // como não é necessário criar sempre essa var lista, ela pode ficar pra fora da função
}

    // pegando os dados do localStorage e armazenando-os de forma persistente na página
itens.forEach( (elemento) => {
    criaElemento(elemento);
});

    // atualização dos elementos
function atualizaElemento (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta (id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerHTML = "X";

    elementoBotao.addEventListener("click", function() {
        removeElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function removeElemento (tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    
    localStorage.setItem("itens", JSON.stringify(itens));
}
