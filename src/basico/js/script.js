/** @format */

const toChange = () => {
  document.querySelectorAll(".form").forEach((form) => {
    form.classList.toggle("mudar");
  });
};

let notas = [];

const calcularMedia = (notas) => {
  let soma = 0;
  for (let nota of notas) {
    soma += nota;
  }

  const media = soma / notas.length;

  return media;
};

// let media;  escopo global

const aprovacao = (notas) => {
  const media = calcularMedia(notas); // escopo da função
  let status = document.getElementById("resultado");

  if ((condicao = media >= 7)) {
    condicao = "aprovado";
    status.classList.add("aprovado");
    status.classList.remove("reprovado");
  } else {
    condicao = "reprovado";
    status.classList.add("reprovado");
    status.classList.remove("aprovado");
  }

  return { media, condicao };
};

// aqui transformei em objetos os o retorno da função, coloquei um if / else para que o condicionasse visualmento o resultado, addcionando a class reprovado ou aprovado de acordo com a condição atendida.

// Função Recursivas

function contagemRegressiva(numero) {
  console.log(numero);

  let proximoNumero = numero - 1;

  if (proximoNumero > 0) contagemRegressiva(proximoNumero);
}

// contagemRegressiva(50);

/*
 * Formulário envio de dados para cálculo da média
 */
const formulario1 = document.getElementById("formulario-01");

if (formulario1) {
  formulario1.addEventListener("submit", function (evento) {
    evento.preventDefault();
    evento.stopPropagation();

    if (!this.classList.contains("erro")) {
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
      document.getElementById("resultado").innerHTML = texto;
    }
  });
}

const validaCampo = (elemento) => {
  elemento.addEventListener("focusout", function (e) {
    e.preventDefault();

    const mensagemThis = document.querySelector(".mensagem-cadastro");
    const button = document.getElementById("btnFormTwo");

    if (!this.value) {
      mensagemThis.innerHTML = `Verifique o campo ${elemento.name}`;
      this.classList.add("erro");
      this.parentNode.classList.add("erro");
      button.disabled = true;
    } else {
      mensagemThis.innerHTML = "";
      this.classList.remove("erro");
      this.parentNode.classList.remove("erro");
    }
  });
};

const validaCampoNumerico = (element) => {
  element.addEventListener("focusout", function (e) {
    e.preventDefault();

    let numero = parseFloat(this.value);

    if (!isNaN(numero) && numero >= 0 && numero <= 10) {
      document.querySelector(".mensagem-media").innerHTML = "";
      this.classList.remove("erro");
      this.parentNode.classList.remove("erro");
    } else {
      document.querySelector(
        ".mensagem-media"
      ).innerHTML = `Verifique o campo ${element.name}`;
      this.classList.add("erro");
      this.parentNode.classList.add("erro");
    }
  });
};

const validaEmail = (element) => {
  element.addEventListener("focusout", function (e) {
    e.preventDefault();

    const emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/i;
    const mensagem = document.querySelector(".mensagem-cadastro");

    if (this.value.match(emailValido)) {
      mensagem.innerHTML = "";
      this.classList.remove("erro");
      this.parentNode.classList.remove("erro");
    } else {
      mensagem.innerHTML = `O campo ${element.name} precisa conter @.-_`;
      this.classList.add("erro");
      this.parentNode.classList.add("erro");
    }
  });
};

/*
 * Num primerio momento apenas interpolei as mensagens que apareciam no momento do focusout para que traga o nome do campo em desacordo com os parametros das funcções não mechi muito, então deixei como referencia o name dos campos, percebi que o campo de email não estava executando ou estava se sobrescrevendo a function valida email, estava sendo usado o for para verificação, então acrescentei uma constante para interar sobre o array, e usei id para chamar a função, dessa forma não só esta verificando se o campo está prenchido, mas também se segue as determinações dentro da RegExp
 */

const validarCampos = (campos, validador) => campos.forEach(validador);

let camposObrigatorios = document.querySelectorAll("input.obrigatorio");
let camposNumericos = document.querySelectorAll("input.numero");
let camposEmail = document.querySelectorAll("input.email");

validarCampos(camposObrigatorios, validaCampo);
validarCampos(camposNumericos, validaCampoNumerico);
validaEmail(document.getElementById("email"));

/*
* acrescentei essa função, ela executoa uma veirifcação na pagina, onde busca a class muda nos objetos indicados, quando tem a class mudar é por que o display do objeto estará definido como none, sendo o toggle simpleste ver se tem a class, se não tem ele adciona e faz o inverso caso tenha.
como não fazia sentido ter o resultado quando a tela de cadastro estivesse sendo exibida, resolvi acrescentar essa div na função.
*/
