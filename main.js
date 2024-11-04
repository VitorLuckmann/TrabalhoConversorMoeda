document.getElementById("botaoConverter").addEventListener("click", Converter);

const moedas = [
    {valorSelect: "2", sigla: "USD"},
    {valorSelect: "3", sigla: "EUR"},
    {valorSelect: "1", sigla: "BRL"},
    
]

async function Converter(){

    document.getElementById("mensagens").innerText = "";

    // Busca os valores inputados pelo usuário.

    const moeda = document.getElementById("moedaSelect").value;
    const moedaConverter = document.getElementById("moedaCoverterSelect").value;
    const valorMoeda = document.getElementById("valorMoedaInput").value;

    // Valida os valores.

    let erros = ValidarInputs(moeda, moedaConverter, valorMoeda)

    // Se houverem erros, exibi na tela e para a função. 
    if( erros != "" ){
        document.getElementById("mensagens").innerText += `${erros}`
        return;
    }

    // Busca a taxa de conversão

    let taxaConversao = await BuscarCotacaoMoedas(moeda, moedaConverter);

    // Caso houver erro de conexão com a API retorna uma mensagem
    if( typeof(taxaConversao) == 'string'){
        document.getElementById("mensagens").innerText += `${taxaConversao}`
        return;
    }

    // Cálculo final

    let resultadoFinal = taxaConversao * parseFloat(valorMoeda);

    document.getElementById("resultado").value = resultadoFinal;

};


function ValidarInputs( moeda, moedaConverter, valorMoeda ){

    let erros = "";

    if( moeda === "0" ) { erros += "\n Moeda não selecionada!"}
    if( moedaConverter === "0") { erros += "\n Moeda a Converter não selecionada!"}
    if( moeda != "0" && moeda == moedaConverter ) { erros += "\n As moedas selecionadas devem ser diferentes!" }
    if( valorMoeda === "" ){ erros += "\n Digite o valor para converter!"; return erros; }

    let valorFloat = parseFloat(valorMoeda);

    if( valorFloat <= 0 ){ erros += "\n O valor a converter deve ser maior que 0!"  }

    return erros;
};


// Busca a cotação das moedas selecionadas em uma API

function BuscarCotacaoMoedas( moeda, moedaConverter ){

    // Para fazer uso do método filter() setei os values do select para números inteiros.
    // A API precisa receber o sigla da moeda para fazer a busca.
    // Então estou buscando na array 'moedas' pela sigla correspondente ao value da moeda no select.

    let siglaMoeda = moedas.filter( x => x.valorSelect == moeda)[0].sigla
    let siglaMoedaConverter = moedas.filter( x => x.valorSelect == moedaConverter)[0].sigla

    // Retorna a taxa de conversão 

    return fetch( `https://economia.awesomeapi.com.br/json/${siglaMoeda}-${siglaMoedaConverter}` )
    .then( (response) => response.json() )
    .then( (dados) =>{

        return parseFloat(dados[0].bid)

    })
    .catch(x => { return "Erro ao buscar a taxa de câmbio, verifique a sua conexão com a internet." });

};