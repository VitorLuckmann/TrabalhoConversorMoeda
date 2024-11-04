# TrabalhoConversorMoeda

Para executar a aplicação. basta abrir o arquivo index.html
Também deixei hospedado no Github Pages (https://vitorluckmann.github.io/TrabalhoConversorMoeda/)

![image](https://github.com/user-attachments/assets/77941238-0e54-4e1f-80ba-83c64cd5eacb)

Essa tela será exibida no navegador, onde podem ser escolhidas as moedas para fazer a conversão e o valor a ser convertido. As moedas que podem ser escolhidas são Real Brasileiro, Dólar Americano e Euro.
Clicando no botão 'Converter', a função de conversão será chamada.

A função de conversão pega os valores inputados pelo usuário ( moeda, moeda de conversão e valor a ser convertido ) e armazena em constantes.

Os valores são validados por uma função de validação que recebe as 3 constantes e caso houver algum erro, a função de conversão é parada e uma mensagem é exibida com os erros.

As validações são:
As moedas devem ser selecionadas e não pode ser escolhido 2 moedas iguais.
O valor a ser convertido não pode estar vazio e deve ser maior que 0.


![image](https://github.com/user-attachments/assets/334cf733-e588-4b62-897e-8226eef8a2e6)


Caso os valores sejam válidos, taxa de converão é buscada em uma função que recebe as moedas selecionadas.
A função que busca a taxa de conversão faz um fetch em uma API devolve as cotações para moedas (https://docs.awesomeapi.com.br/api-de-moedas).

É feito um Get nessa API passando as siglas das moedas, no resultado do fetch busco a taxa de câmbio e retorno na função.

Caso não haja conexão com a internet, essa função retorna uma mensagem de erro que será exibida.

Após receber a taxa de conversão, multiplico a taxa de conversão com o valor a converter digitado pelo usuário e é exibido no campo resultado.

Desenvolvido por Vitor Hugo Zonta Luckmann
