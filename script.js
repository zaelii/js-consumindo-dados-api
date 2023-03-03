async function buscaEndereco(cep) {

    var MensagemErro = document.getElementById("erro");
    MensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw new Error("CEP não encontrado");
        }

        var cidade = document.getElementById("cidade");
        var logradouro = document.getElementById("endereco");
        var estado = document.getElementById("estado");

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (error) {
        console.log(error);
        MensagemErro.innerHTML = `<p>CEP não encontrado</p>`;

    }
}

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => {
    buscaEndereco(cep.value);
});