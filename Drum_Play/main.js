
    // função genérica para tocar qualquer um dos sons do html
function tocaSom (idElementAudio) {
   const elemento = document.querySelector(idElementAudio); // busca no documento html o id com a #... e retorna a referência à aquela linha, podendo executar
                                                     // funções em cima dela, como o .play (no caso dessa tag de audio)
    if (!elemento)
        console.log('Elemento não encontrado');
    else if (elemento.localName === 'audio')
        elemento.play();
    else
        console.log('Elemento presente, mas não é de áudio');
}


//let count = 0;
let listaDeTeclas = [];                                 // variável do tipo constante 
listaDeTeclas = document.querySelectorAll('.tecla');    // atribuição à nova variável da lista retornada do querySelectorAll (pega todos botões)

/*    // estrutura de repetição para iterar cada uma das teclas -> funcional porém não otimizada
while (count < listaDeTeclas.length) {

    const tecla = listaDeTeclas[count]                  // como utilizamos esse elemento várias vezes, é interessante fazer uma variável para deixar limpo
    instrumento = tecla.classList[1];                   // acesso ao elemento em que o count está, depois a lista dessa struct e seleciona a variável 1
                                                        // essa var é onde está o texto "tecla_..." que iremos utilizar na função anonima abaixo 

    const idAudio = `#som_${instrumento}`;              // criamos uma variável para armazenar a string dinâmica (por isso as crases)
    tecla.onclick = function () {                       // acessa o index do count com o onclick e utiliza uma função anônima
        tocaSom(idAudio);
    }
    count++;
}*/

    // estrutura de repetição para iterar cada uma das teclas -> forma mais otimizada
for (let i = 0; i < listaDeTeclas.length; i++) {
    const tecla = listaDeTeclas[i];
    const instrumento = tecla.classList[1];
    const idAudio = `#som_${instrumento}`;
    
    tecla.onclick = function () {
        tocaSom(idAudio);
    }

        // função anônima para adicionar uma classe dentro de uma tag do HTML
    tecla.onkeydown = function (evento) {             // .onkeydown = quando a tecla é pressionada pelo usuário
        if (evento.code === 'Space' || evento.code === 'Enter')     // operação lógica com condicional para atrelar a clicada à duas teclas somente
            tecla.classList.add('ativa');           // nesse caso é adicionada a classe 'ativa' na tag do html, o que faz o botão na página ficar clicado
    }

        // função anônima para remover uma classe dentro de uma tag do HTML
    tecla.onkeyup = function () {               // .onkeyup = quando o usuário tira o dedo da tecla
        tecla.classList.remove('ativa');        // remove a class 'ativa'
    }

}

