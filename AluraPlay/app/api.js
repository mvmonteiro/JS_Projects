async function getVideosAPI() {
    const res = await fetch('http://localhost:3000/videos');
    const apiTraduzida = await res.json();
    
    return apiTraduzida;
}

async function criaVideo(titulo, descricao, url, imagem) {
    const res = await fetch('http://localhost:3000/videos', {
        method: "POST",
        headers: {
            "Content-type": "application/json"                          // especifica qual o tipo de arquivo deverá ser enviado ou recebido (tipo json)
        },
        body: JSON.stringify({                                          // fazendo o corpo da requisição com um objeto com aqueles valores e o stringfy é quem faz a tradução para JSON depois
            titulo : titulo,
            descricao : `${descricao} visualizações`,
            url : url,
            imagem : imagem
        })
    });

    if(!res.ok){
        throw new Error("Não foi possível enviar o vídeo.")
    }

    const requisicaoTraduzida = await res.json();
    return requisicaoTraduzida;
}

async function buscaVideo(termoDeBusca) {
    const res = await fetch(`http://localhost:3000/videos?q=${termoDeBusca}`)
    const apiTraduzida = res.json();

    return apiTraduzida;
}

export const conectaApi = {
    getVideosAPI,
    criaVideo,
    buscaVideo
}