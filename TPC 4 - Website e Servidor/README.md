# TPC 4 de Processamento e Representação de Informação (PRI)

## 1º Tarefa:
A partir do [XML]: Arqueossítios do Nordeste Português realizou-se um xslt que permite processar este XML num website, de forma a que gere um ficheiro por cada arqueossítio registado, e que sejam encontrados numerados. Este website apresenta um índice agrupado e ordenado inicialmente por concelhos no qual é listado os arqueossítios, em que cada um mostre um link que remete à página de cada arqueossítio com a informação fornecida.

## 2º Tarefa: 
A partir do website da tarefa anterior, pretendesse implementar um servidor desenvolvido em "Node.js" que permita devolver ao utilizador a página html. Considere um pedido válido: **localhost:7777/arqs/XXX**, onde XXX corresponde ao número do ficheiro arqXXX.html criado na tarefa anterior. Tem-se em consideração o seguinte pedido: **localhost:7777/arqs/**, correspondendo a apresentar o índice ao utilizador. Qualquer outro pedido será considerado inválido.

[XML]:http://www4.di.uminho.pt/~jcr/XML/didac/xmldocs/arq.xml
