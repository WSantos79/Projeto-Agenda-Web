// Referenciando input
let inpt = document.querySelector('input[name=tarefa');

// Referenciando botão
let btn = document.querySelector('#botao');

// Referenciando lista
let lista = document.querySelector('#lista');

// Referenciando card
let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('BDtarefas')) || []; // JSON.parse converte a lista de string para array

function renderizarTarefas() {
    // limpar a listagem de items antes de renderizar a tela
    lista.innerHTML = '';

    for (tarefa of tarefas) {
        // Criar o item da lista
        let itemLista = document.createElement('li');

        // Adicionar classes no item da lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        // Adicionar evento de clique no item da lista
        itemLista.onclick = function () {
            deletarTarefa(this);
        }

        // Criar um texto
        let itemTexto = document.createTextNode(tarefa);

        // Adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        // Adicionar o item da lista na lista de tarefa
        lista.appendChild(itemLista);

    }
}

renderizarTarefas();

// pegando evento clique de botao
btn.onclick = function () {

    // capturando o valor digitado no input
    let novaTarefa = inpt.value;
    if (novaTarefa !== '') { // vereficando se foi digitado algo

        // inserir nova tarefa na lista (array) e renderizar a tela
        tarefas.push(novaTarefa);
        salvarDados();
        renderizarTarefas();

        // limpar mensagem de erro (span)
        removerSpans();
    } else {
        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Você precisa informar a tarefa!');

        // limpar mensagem de erro (span)
        removerSpans();

        // adcionar mensagem de erro
        span.appendChild(msg);
        card.appendChild(span);

    }
    // limpar o input
    inpt.value = '';

}

function removerSpans() {
    let spans = document.querySelectorAll('span');

    for (let i = 0; i < spans.length; i++) {
        card.removeChild(spans[i]);
    }

}

function deletarTarefa(trf) {
    // remove a tarefa do array
    tarefas.splice(tarefas.indexOf(trf.textContent), 1);

    salvarDados();
    renderizarTarefas();
}

function salvarDados() {
    // Salvar dados no Storage do navegador   
    localStorage.setItem('BDtarefas', JSON.stringify(tarefas)); // JSON.stringify transforma o array em uma lista de string
} 
