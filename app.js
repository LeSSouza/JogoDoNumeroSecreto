//document.querySelector -> Serve para selecionar objeto HTML
// variavel.innterHTML -> Serve para realizar alteração no HTML

//let titulo = document.querySelector('h1');
//titulo.innerHTML = '';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = '';
let = listaDeNumerosSorteados = [];
let = numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1


// função com parametros e sem retornos
function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// função sem parametros
function verificarChute(){
    // Escopo da função

    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou');

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;

        exibirTextoNaTela('p',mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p',`Número secreto é menor`);
        }
        else {
            exibirTextoNaTela('p',`Número secreto é maior`);
        }
        tentativas++;
        limparCampo();
    }
}

// função com retorno
function gerarNumeroAleatorio (){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementos = listaDeNumerosSorteados.length;

    if(quantidadeDeElementos == numeroLimite){
        listaDeNumerosSorteados = []
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1',`Jogo do número secreto`);
    exibirTextoNaTela('p',`Escolha um número entre 1 e ${numeroLimite}`);
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}



exibirMensagemInicial();
