const menorValor = 1;
const maiorValor = 1000;
const numeroSecreto = gerarNumeroAleatorio();
const elementoMenorValor = document.querySelectorAll("#menor-valor");
const elementoMaiorValor = document.querySelectorAll("#maior-valor");


function gerarNumeroAleatorio () {
    return parseInt(Math.random() * maiorValor + 1);
}

elementoMenorValor.forEach( e => {
    e.innerHTML = menorValor;
})

elementoMaiorValor.forEach( e => {
    e.innerHTML = maiorValor;
})

console.log(numeroSecreto);