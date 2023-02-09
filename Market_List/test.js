// Testando como fazer um objeto simples e constante (aula 1)

const listaDeItens = {
    item1: 'Biscoito',
    item2: 'suco',
    quantidade1: 3,
    quantidade2: 4,
    mostrarItem: function() {
        alert('Comprei ' + listaDeItens.quantidade1 + ' caixinhas de ' + listaDeItens.quantidade2)
    }
}

listaDeItens.mostrarItem()

//