// associando a linha de código html a cada const
/*
const subtrair = document.querySelector('#subtrair');
const somar = document.querySelector('#somar');
const braco = document.querySelector('#braco');
*/
const controle = document.querySelectorAll("[data-controle]");     // desse modo conseguimos selecionar todos os equipamentos pela mesma classe
const estatistica = document.querySelectorAll("[data-estatistica]");

const pecas = {
    "bracos": {
        "forca": 29,
        "poder": 35,
        "energia": -21,
        "velocidade": -5
    },

    "blindagem": {
        "forca": 41,
        "poder": 20,
        "energia": 0,
        "velocidade": -20
    },
    "nucleos":{
        "forca": 0,
        "poder": 7,
        "energia": 48,
        "velocidade": -24
    },
    "pernas":{
        "forca": 27,
        "poder": 21,
        "energia": -32,
        "velocidade": 42
    },
    "foguetes":{
        "forca": 0,
        "poder": 28,
        "energia": 0,
        "velocidade": -2
    }
}

// declaração de cada função

    // função simples e com muita repetição
/*
somar.addEventListener("click", () => {manipulaDados("somar")})

subtrair.addEventListener("click", () => {manipulaDados("subtrair")})

function manipulaDados (operacao) {
    if (operacao === "subtrair") 
        braco.value = parseInt(braco.value) - 1; // o número vem do html como uma string, assim é necessário transforma-lo em int para manipular
    else
        braco.value = parseInt(braco.value) + 1; // o número vem do html como uma string, assim é necessário transforma-lo em int para manipular
}
*/

    // função complexa e dinâmica

controle.forEach ( (elemento) => {
    elemento.addEventListener("click", (evento) => {
        manipulaDados(evento.target.dataset.controle, evento.target.parentNode);
        atualizaEstatisticas(evento.target.dataset.peca);
    })
})

function manipulaDados (operacao, elementoPai) {
    const peca = elementoPai.querySelector("[data-contador]")

    if (operacao === "-") 
        peca.value = parseInt(peca.value) - 1; // o número vem do html como uma string, assim é necessário transforma-lo em int para manipular
    else
        peca.value = parseInt(peca.value) + 1; // o número vem do html como uma string, assim é necessário transforma-lo em int para manipular
}

function atualizaEstatisticas (peca) {
    estatistica.forEach ( (elemento) => {
        elemento.textContent = parseInt(elemento.textContent) + pecas[peca][elemento.dataset.estatistica];
    })
}