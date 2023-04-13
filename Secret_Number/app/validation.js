function validacaoChute(chute) {
    const numero = +chute;

    if (chuteInvalido(numero)) {
        if (chute.toUpperCase() === "GAME OVER") {

            document.body.innerHTML =
                `
                <h2 class="over">Game Over!!!</h2>
                <h3>Pressione o botão para jogar novamente</h3>
                <button id="jogar-novamente" class="btn-jogar" >Jogar novamente</button>
                `
                document.body.style.backgroundColor = "black";
                document.body.style.color = "red";
        } 
        else {
            elementoChute.innerHTML += '<div>Valor inválido: você deve falar um número.</div>';
        }
        return
    }

    if (numeroMaiorQueLimite(numero)) {
        elementoChute.innerHTML += `<div>Valor inválido: o número secreto está entre ${menorValor} e ${maiorValor}.</div>`
        return
    }

    if (numero === numeroSecreto) {
        document.body.innerHTML = `
            <h2>Você acertou !!</h2>
            <h3>O número secreto era ${numeroSecreto}</h3>

            <button id="jogar-novamente" class="btn-jogar">Jogar novamente</button>
        `
    } else if (numero > numeroSecreto) {
        elementoChute.innerHTML += `
            <div>O número secreto é menor <i class="fa-solid fa-arrow-down-long"></i></div>
        `
    } else {
        elementoChute.innerHTML += `
            <div>O número secreto é maior <i class="fa-solid fa-arrow-up-long"></i></div>
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