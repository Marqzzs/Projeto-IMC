function calcular() {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);
    
    if (isNaN(altura) || isNaN(peso) || nome.length == 0){
        alert("Preencha todos os campos")
        return;
    }

    //calcular o imc
    const imc = calcularImc(altura, peso);
    const situacao = retornaSituacao(imc)

    console.log(nome);
    console.log(altura);
    console.log(peso);
    console.log(imc);
    console.log(situacao);
}

function calcularImc(altura, peso) {
    return peso / Math.pow(altura, 2);
}

function retornaSituacao(imc) {
    //validar o imc
    //4 minutos para fazer
    if (imc <= 18.5) {
        return 'Magreza Severa'
    }else if(imc >= 18.5 && imc <= 24.99){
        return 'Peso normal'
    }else if(imc >= 25 && imc <= 29.99){
        return 'Acima do peso'
    }else if(imc >= 30 && imc <= 34.99){
        return 'Obesidade I'
    }else if(imc >= 35 && imc <= 39.99){
        return 'Obesidade II (severa)'
    }else{
        return 'Cuidado!!!'
    }
}