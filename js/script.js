
// Referenciando input
let inpt = document.querySelector('input[name=tarefa]');

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

    tarefas.forEach((tarefa, index) => {
        // Criar o item da lista
        let itemLista = document.createElement('li');

        // Adicionar classes no item da lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action d-flex justify-content-between align-items-center');
        itemLista.setAttribute('draggable', 'true'); // Permitir que o item seja arrastável
        itemLista.setAttribute('data-index', index); // Atribuir um índice ao item

        // Criar um texto
        let itemTexto = document.createTextNode(tarefa);

        // Criar o botão "X" para deletar
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.setAttribute('class', 'btn btn-danger btn-sm ms-2');
        deleteBtn.onclick = function (event) {
            event.stopPropagation(); // Evitar que o clique no botão afete o drag and drop
            deletarTarefa(index);
        };

        // Adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        // Adicionar o botão de deletar no item da lista
        itemLista.appendChild(deleteBtn);

        // Adicionar o item da lista na lista de tarefa
        lista.appendChild(itemLista);

        // Eventos de Drag and Drop
        itemLista.addEventListener('dragstart', dragStart);
        itemLista.addEventListener('dragover', dragOver);
        itemLista.addEventListener('drop', drop);
        itemLista.addEventListener('dragend', dragEnd);
    });
}

renderizarTarefas();

// pegando evento clique de botao
btn.onclick = function () {

    // capturando o valor digitado no input
    let novaTarefa = inpt.value;
    if (novaTarefa !== '') { // verificando se foi digitado algo

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

        // adicionar mensagem de erro
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

function deletarTarefa(index) {
    // remove a tarefa do array
    tarefas.splice(index, 1);

    salvarDados();
    renderizarTarefas();
}

function salvarDados() {
    // Salvar dados no Storage do navegador   
    localStorage.setItem('BDtarefas', JSON.stringify(tarefas)); // JSON.stringify transforma o array em uma lista de string
}

// Variável para armazenar o índice do item que está sendo arrastado
let draggedIndex = null;

// Funções para drag and drop
function dragStart(event) {
    draggedIndex = event.target.getAttribute('data-index'); // Armazenar o índice do item arrastado
    event.target.classList.add('dragging');
}

function dragOver(event) {
    event.preventDefault(); // Necessário para permitir o drop
}

function drop(event) {
    event.preventDefault();
    const targetIndex = event.target.getAttribute('data-index'); // Índice do item alvo

    // Trocar as tarefas no array com base nos índices
    [tarefas[draggedIndex], tarefas[targetIndex]] = [tarefas[targetIndex], tarefas[draggedIndex]];

    salvarDados();
    renderizarTarefas();
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
}

