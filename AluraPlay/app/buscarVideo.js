import { conectaApi } from "./api.js";
import constroiCard from "./exibeVideos.js"

const elementoPesquisa = document.querySelector("[data-pesquisa]");
const elementoBotaoPesquisa = document.querySelector("[data-botaoPesquisa]")

async function videoProcurado(evento) {
    evento.preventDefault();

    const busca = await conectaApi.buscaVideo(elementoPesquisa.value);

    const lista = document.querySelector("[data-lista]");

        // apaga toda a lista enquanto houver elementos
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

        // adiciona somente os elementos que forem pesquisados
    busca.forEach( (video) => lista.appendChild(constroiCard(video.titulo, video.descricao, video.url, video.imagem)));

    if(busca.length == 0) {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não existem vídeos com o termo pesquisado.</h2>`
    }

}

elementoBotaoPesquisa.addEventListener("click", (evento) => videoProcurado(evento))