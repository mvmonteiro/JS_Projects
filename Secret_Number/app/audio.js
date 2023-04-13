const elementoChute = document.getElementById('chute');
const divDescricao = document.getElementById('descricao');

window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'pt-Br';
recognition.start();

recognition.addEventListener('result', onSpeak);

function onSpeak(evento) {
    const chute = (evento.results[0][0].transcript);
    exibeChuteNaTela(chute);
    validacaoChute(chute);
}

function exibeChuteNaTela(chute) {
    divDescricao.innerHTML = `
        <h1>Acerte o número secreto !</h1>
        <p>(O número está entre <span id="menor-valor">0</span> e <span id="maior-valor">100</span>)<p>
    `

    elementoChute.innerHTML = `
        <div>Você disse</div>
        <span class="box">${chute}</span>
    `
}

recognition.addEventListener('end', () => recognition.start());