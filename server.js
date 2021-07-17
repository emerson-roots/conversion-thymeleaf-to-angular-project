/**fonte
  https://backefront.com.br/configurando-projeto-angular-heroku/

  passos para deploy no heroku:

  instalar o express

  criar arquivo Procfile na raiz da aplicacao com o conteudo 'web: npm start'

  criar este server.js na raiz da aplicacao

  alterar arquivo package.json incluindo e ajustando as versoes;

    "engines": {
      "node": "12.18.3",
      "npm": "6.14.6"
    }

  ainda no package.json copiar de devDepenncies para dependencies

  @angular/cli"
  @angular/compiler
  @angular/compiler-cli

  alterar as chaves "start" e "build" de scripts do package.json para;
    "start": "node server.js",
    "build": "ng build --prod",

    em angular.json o tamanho de maximumWarning e maximumError ajustar
    "type": "initial",
    "maximumWarning": "2mb",
    "maximumError": "5mb"

 **/


//Importa as dependências que acabamos de instalar
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000

const app = express();

// Serve os arquivos estáticos da pasta dist (gerada pelo ng build)
app.use(express.static(__dirname + "/dist/conversion-thymeleaf-to-angular-project"));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/dist/conversion-thymeleaf-to-angular-project/index.html"));
});

// Inicia a aplicação pela porta configurada
app.listen(PORT);