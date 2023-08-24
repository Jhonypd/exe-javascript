

let notas = []

const calcularMedia = (notas) => {

    let soma = 0;
    for (let nota of notas) {
        soma += nota;
    }

    const media = soma / notas.length;

    return media;

}



// let media;  escopo global

function aprovacao(notas) {
    const media = calcularMedia(notas); // escopo da função
    let status = document.getElementById('resultado')
    
    if(condicao = media >= 8){
        condicao = 'aprovado'
        status.classList.toggle('aprovado')
    } else {
        condicao = 'reprovado'
        status.classList.toggle('reprovado')
    }
    
    return { media, condicao };    
}
// aqui transformei em objetos os o retorno da função, coloquei um if / else para que o condicionasse visualmento o resultado, addcionando a class reprovado ou aprovado de acordo com a condição atendida.


// Função Recursivas

function contagemRegressiva(numero) {

    console.log(numero);

    let proximoNumero = numero - 1;

    if (proximoNumero > 0)
        contagemRegressiva(proximoNumero);

}

// contagemRegressiva(50);

/* 
 * Formulário envio de dados para cálculo da média 
 */
const formulario1 = document.getElementById('formulario-01');

if (formulario1) {
    formulario1.addEventListener('submit', function (evento) {
        evento.preventDefault();
        evento.stopPropagation();

        if (!this.classList.contains('erro')) {
            const dados = new FormData(this);
            const notas = [];

            for (let key of dados.keys()) {
                const numero = dados.get(key).match(/\d*/) ? Number(dados.get(key)) : 0;
                if (!isNaN(numero)) {
                    notas.push(numero);
                }
            }

            const { media, condicao } = aprovacao(notas);

            console.log(notas);
            const texto = `Média: ${media} <br> Resultado: ${condicao}`;
            document.getElementById('resultado').innerHTML = texto;
        }
    });
}



function validaCampo(elemento) {

    elemento.addEventListener('focusout', function (event) {

        event.preventDefault();

        if (this.value == "") {
            document.querySelector('.mensagem2').innerHTML = `Verifique o campo ${elemento.name}`;
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        } else {
            document.querySelector('.mensagem2').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        }

    });

}

function validaCampoNumerico(element) {

    element.addEventListener('focusout', function (e) {

        e.preventDefault();

        let numero = this.value.match(/^[\d]5-[\d]3/) ? this.value.replace(/-/, "") : this.value;

        if (numero != "" && numero.match(/[0-9]*/) && numero >= 0 && numero <= 10) {
            document.querySelector('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = `Verifique o campo ${element.name}`;
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        }

    });

}



function validaEmail(element) {
    element.addEventListener('focusout', function (e) {
        e.preventDefault();

        const emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/i;
        const mensagem = document.querySelector('.mensagem2');

        if (this.value.match(emailValido)) {
            mensagem.innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        } else {
            mensagem.innerHTML = `Verifique o campo ${element.name}`;
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        }
    });
}

/*
* Num primerio momento apenas interpolei as mensagens que apareciam no momento do focusout para que traga o nome do campo em desacordo com os parametros das funcções não mechi muito, então deixei como referencia o name dos campos, percebi que o campo de email não estava executando ou estava se sobrescrevendo a function valida email, estava sendo usado o for para verificação, então acrescentei uma constante para interar sobre o array, e usei id para chamar a função, dessa forma não só esta verificando se o campo está prenchido, mas também se segue as determinações dentro da RegExp
*/





const validarCampos = (campos, validador) => campos.forEach(validador);

let camposObrigatorios = document.querySelectorAll('input.obrigatorio');
let camposNumericos = document.querySelectorAll('input.numero');
let camposEmail = document.querySelectorAll('input.email');

validarCampos(camposObrigatorios, validaCampo);
validarCampos(camposNumericos, validaCampoNumerico);
validaEmail(document.getElementById('email'), '.mensagem2');





/*
* acrescentei essa função, ela executoa uma veirifcação na pagina, onde busca a class muda nos objetos indicados, quando tem a class mudar é por que o display do objeto estará definido como none, sendo o toggle simpleste ver se tem a class, se não tem ele adciona e faz o inverso caso tenha.
como não fazia sentido ter o resultado quando a tela de cadastro estivesse sendo exibida, resolvi acrescentar essa div na função.
*/
function mudar() {
    let cad = document.querySelector('.cd')
    let cmd = document.querySelector('.cm')
    let res = document.querySelector('#resultado')

    cad.classList.toggle('mudar')
    cmd.classList.toggle('mudar')
    res.classList.toggle('mudar')
}


