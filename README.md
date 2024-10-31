1- Utilizei a ferramenta de automação chamada Cypress, Instalada na ultima versão
Foi escolhido essa ferramenta, por 2 motivos!
1-Meus conhecimento estão ligados a ela!
2-A ferramenta tem um desempenho e uma facilidade melhor para produzir testes automatizados comparado as outras ferramentas!

----------------------------------

2-Não instalei plugins de cucumber pois em boas práticas não se utiliza esse plugins no cypress, até porque a linguagem oferece boas explicações
na hora de executar seus testes, esta tudo bem explicado o que cada caso vai executar de ação!

--------------------------------

3-Foi realizado as duas tarefas obrigátorias como:

 it'Filtrar no campo de pesquisa por Shirt e faze checkout de um produto, Validando algumas opções'
 Esse primeiro cenário faz todo o teste da tarefa obrigatória onde diz o cenário:

 -visitar na pagina
 -clicar no campo de pesquisa principal
 -filtrar pela categoria shirt
-Adiciona o produto no carrinho informando tamanho e cores.
-Realiza o procedimento de checkout até o final

-----------------------------------------

4-Tivemos os cenários de cada diferencial conforme a pasta chamada cypress > e2e > Caso01QALuma.cy.js é nesse arquivo onde é executado os testes


--------------------------------------------

5- Foi instalado o relatorio chamado moca , Esta configurado para funcionar da seguinte forma...

No terminal digite o comando 'npm run test' assim a pasta reports será apagada, e ao finalizar o teste sera criada uma nova pasta com os arquivos html
do resultado de teste, basta achar o local do arquivo na pasta do projeto e executar no navegador!

-----------------------------------------------

Para instalar e funcionar o projeto, Precisa ter um vs code , criar uma pasta qualquer apenas para instalar as ferramentas como 

Vs code - Node - Cypress

Para instalar o cypres digite, npm init -y e depois npm install cypress .. Assim que a instalação for conclúida, Digitamos o comando npx cypress open
para abrir o cypress e escolher um navegador para executar os testes!

--------------------------------------------------
Depois basta abrir um VS code com a pasta do projeto onde esta o QALuma e executar conforme comentado!

---------------------------------------------------



 