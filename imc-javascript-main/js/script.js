// Array vazio para armazenar informações de pessoas
const arrPessoas = [];

// Verifica se há dados salvos no localStorage
if (localStorage.getItem("arrPessoas") !== null) {
  arrPessoas = JSON.parse(localStorage.getItem("arrPessoas"));
}

// Chama a função para listar as pessoas
listarPessoas();

// Função que é chamada quando o formulário é submetido
function calcular(e) {
  e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

  // Coleta os valores do nome, altura e peso do formulário
  const nome = document.getElementById("nome").value.trim();
  const altura = parseFloat(document.getElementById("altura").value);
  const peso = parseFloat(document.getElementById("peso").value);

  // Verifica se os valores são válidos
  if (isNaN(altura) || isNaN(peso) || nome.length == 0) {
    alert("Preencha todos os campos");
    return;
  }

  // Calcula o IMC
  const imc = calcularImc(altura, peso);
  const situacao = retornaSituacao(imc);

  const dt = new Date();
  const dia = dt.getDate() < 10 ? `0${dt.getDate()}` : dt.getDate();
  const mes = dt.getMonth() + 1;
  const ano = dt.getFullYear();
  const data = dia + mes + ano;

  // Cria um objeto "pessoa" com as informações coletadas
  let pessoa = {};
  pessoa.nome = nome;
  pessoa.altura = altura;
  pessoa.peso = peso;
  pessoa.imc = imc;
  pessoa.situacao = situacao;
  pessoa.data = data;

  // Adiciona o objeto "pessoa" ao array "arrPessoas"
  arrPessoas.push(pessoa);

  // Salva o array "arrPessoas" no armazenamento local (localStorage)
  localStorage.setItem('arrPessoas', JSON.stringify(arrPessoas));

  // Exibe o array atualizado na tabela HTML
  listarPessoas();
}

// Função para calcular o IMC
function calcularImc(altura, peso) {
  return peso / Math.pow(altura, 2);
}

// Função para retornar a situação com base no IMC
function retornaSituacao(imc) {
  if (imc <= 18.5) {
    return "Magreza Severa";
  } else if (imc >= 18.6 && imc <= 24.99) {
    return "Peso normal";
  } else if (imc >= 25 && imc <= 29.99) {
    return "Acima do peso";
  } else if (imc >= 30 && imc <= 34.99) {
    return "Obesidade I";
  } else if (imc >= 35 && imc <= 39.99) {
    return "Obesidade II (severa)";
  } else {
    return "Cuidado!!!";
  }
}

// Função para listar as informações das pessoas na tabela HTML
function listarPessoas() {
  let template = "";
  for (let i = 0; i < arrPessoas.length; i++) {
    template += `<tr>
                    <td>${arrPessoas[i].nome}</td>
                    <td>${arrPessoas[i].altura}</td>
                    <td>${arrPessoas[i].peso}</td>
                    <td>${arrPessoas[i].imc.toFixed(2)}</td>
                    <td>${arrPessoas[i].situacao}</td>
                    <td>${arrPessoas[i].data}</td>
                    </tr>`;
  }

  // Atualiza a tabela HTML com as informações das pessoas
  document.getElementById('cadastro').innerHTML = template;
}
