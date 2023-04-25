import { conectaApi } from "./api.js";
const elementoFormulario = document.querySelector("[data-formulario]");

async function recebeVideo(video) {
    video.preventDefault();

    const imagem = document.querySelector("[data-imagem]").value;
    const titulo = document.querySelector("[data-titulo]").value;
    const url = document.querySelector("[data-url]").value;
    const descricao = Math.floor(Math.random() * 10).toString();

    try{    
        await conectaApi.criaVideo(titulo, descricao, url, imagem);
        
        window.location.href = "../pages/envio-concluido.html";
    } catch(e){
        alert(e);
    }

}

elementoFormulario.addEventListener("submit", (evento) => recebeVideo(evento));