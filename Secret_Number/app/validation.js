function validacaoChute(chute) {
    const numero = +chute;

    if (chuteInvalido(numero)) {
        if (chute.toUpperCase() === "GAME OVER") {

            document.body.innerHTML =
                `
                <h2 class="h2-over">Game Over!!!</h2>
                <h3 class="h3-over">Pressione o botão para jogar novamente</h3>
                <button id="jogar-novamente" class="btn-jogar">Jogar novamente</button>
                `
                document.body.style.backgroundColor = "black";
        } 
        else {
            elementoChute.innerHTML += '<div class="invalido"><strong>Valor inválido</strong>: você deve falar um número.</div>';
        }
        return
    }

    if (numeroMaiorQueLimite(numero)) {
        elementoChute.innerHTML += `<div class="invalido"><strong>Valor inválido</strong>: o número secreto está entre ${menorValor} e ${maiorValor}.</div>`
        return
    }

    if (numero === numeroSecreto) {
        document.body.innerHTML = `
            <h2 class="h2-acertou">Você acertou !!</h2>
            <h3 class="h3-acertou">O número secreto era ${numeroSecreto}</h3>

            <button id="jogar-novamente" class="btn-jogar">Jogar novamente</button>
        `
    } else if (numero > numeroSecreto) {
        elementoChute.innerHTML += `
            <div class="dica">O número secreto é menor <i class="fa-solid fa-arrow-down-long"></i></div>
        `
    } else {
        elementoChute.innerHTML += `
            <div class="dica">O número secreto é maior <i class="fa-solid fa-arrow-up-long"></i></div>
        `
    }
}

function chuteInvalido (numero) {
    return Number.isNaN(numero);
}

function numeroMaiorQueLimite(numero) {
    return numero > maiorValor || numero < menorValor;
}

document.body.addEventListener('click', evento => {
    if(evento.target.id === 'jogar-novamente') {
        window.location.reload();
    }
})