import { conectaApi } from "./api.js";

const elementoUL = document.querySelector("[data-lista]");              // lista "ul" do html a partir do data attribute

// function constroiCard(listaDeVideos) {

//     listaDeVideos.forEach( (video) => {
//         elementoUL.innerHTML += `
//             <li class="videos__item">
//                 <iframe width="100%" height="72%" src="${video.url}"
//                     title="YouTube video player" frameborder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowfullscreen></iframe>
//                 <div class="descricao-video">
//                     <img src="${video.imagem}" alt="logo canal alura">
//                     <h3>${video.titulo}</h3>
//                     <p>${video.descricao}</p>
//                 </div>
//             </li>
//         ` 
//     })
// }

// async function listaDeVideos() {
//     const lista = await conectaApi.getVideosAPI();
//     constroiCard(lista)
// }

// listaDeVideos();

export default function constroiCard(titulo, descricao, url, imagem) {
    const video = document.createElement('li');                         // const que cria um elemento "li" no html
    video.className = "videos__item";                                   // adiciona uma class ao li e depois escrever html dentro dele
    video.innerHTML = `                                               
        <iframe width="100%" height="72%" src="${url}"
            title="${titulo}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
        <div class="descricao-video">
            <img src="${imagem}" alt="logo canal alura">
            <h3>${titulo}</h3>
            <p>${descricao}</p>
        </div>
    `
                                                                        // utilização das props advindas da API
    return video;
}

async function listaDeVideos() {                                        // por estar tratando a API, utiliza-se função assíncrona
   try{
       const listaApi = await conectaApi.getVideosAPI();                   // passando os dados da API para um array de objetos
       listaApi.forEach( (elemento) => elementoUL.appendChild(             // para cara objeto o programa deve adicionar à lista "ul" uma nova child que 
       constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem))) // está na função constroiCard (que retorna um elemento "li")
    } catch{
        elementoUL.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de vídeos</h2>`;
    }
}

listaDeVideos();