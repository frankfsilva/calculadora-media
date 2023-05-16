
const form = document.getElementById('form-atividade'); //Lincando com o formulário 
const imgAprovado = '<img src="/images/aprovado.png" alt="emoji celebrando"/>';       //variavel para buscar o emoji
const imgReprovado = '<img src="/images/reprovado.png" alt="emoji decepcionado"/>';    //variavel para buscar o emoji
const atividades = [];   //array para armazenar as atividades 
const notas = [];       //array para armazenar as notas
const spanAprovado = '<span class= "resultado aprovado">Aprovado</span>';           //para controlar o estilo do texto 
const spanReprovado = '<span class= "resultado reprovado">Reprovado</span>';        //para controlar o estilo do texto
const notaMinima = parseFloat(prompt('Digite a nota mínima'));                      //parametrização da nota mínima

let linhas = '';        //variável que começa vazia para armazenar o conteudo (dados das colunas)
                        //a ser adicionado. Tem que ser uma variável global, pois se estiver dentro do event
                        //será reescrita por cima dos dados anteriores

form.addEventListener('submit', function(e){
    e.preventDefault();                                 //Eliminando evento padrão de atualizar a página   

    adicionLinha();
    atualizaTabela();   
    atualizaMediaFinal();
});

function adicionLinha(){                                //função para adicionar uma linha nova á variavel linha
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {        //includes verifica se há uma string no array   
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);          //'push' busca os dados e insere-os na array
        notas.push(parseFloat(inputNotaAtividade.value));   //'push' busca os dados e insere-os na array
        
        let linha = '<tr>';                                 //Criando  uma variável para criar a linha na tabela
        linha += `<td>${inputNomeAtividade.value}</td>`;    //Adicionando uma coluna na variável na tabela
        linha += `<td>${inputNotaAtividade.value}</td>`;    //Adicionando outra coluna na variável na tabela
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; //Adicionando outra coluna na variável na tabela. Operador ternário ('?' = if e ':' = else)
        linha += '</tr>';                                   //Adicionando outra coluna na variável na tabela
    
        linhas += linha;     
    }

    inputNomeAtividade.value ='';                           //zerando o campo  após inserção na tabela
    inputNotaAtividade.value = '';                          //zerando o campo  após inserção na tabela
}

function atualizaTabela() {                                 //função para adicionar os dados á tabela do html
    const corpoTabela = document.querySelector('tbody');    //Recupreando o corpo da tabela
    corpoTabela.innerHTML = linhas;                         //Inserindo o conteudo no html
}

function atualizaMediaFinal(){
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);   //recuperando o elemento e escrevendo no html simultaneamente
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;    //recuperando o elemento e escrevendo no html simultaneamente com o operador ternário calculando o resultado
};

function calculaMediaFinal(){
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++){
        somaDasNotas = somaDasNotas + notas[i];
    }

    return somaDasNotas / notas.length;
}


