# Sobre o projeto:
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/emerson-roots/conversion-thymeleaf-to-angular-project/blob/master/LICENSE) 

### Este foi meu primeiro projeto em ANGULAR/Bootstrap 4 para consumir uma API Rest Java/Spring Boot/Spring Security implementado com base em pesquisas, estudo de caso, tentativa e erro e de forma autodidata.

Para o aprendizado inicial, foi feito uma conversão de um projeto já existente de padrão template engine Thymeleaf na qual o intuito era replicar pelo angular uma cópia fiel das views e seu comportamento thymeleaf. A parte de segurança de autênticação/autorização foi uma melhoria, uma espécie de contribuição adicionada ao projeto original.

Foi criado para consumir uma API Rest java (que também foi reescrita para se adaptar ao angular) hospedada no HEROKU. Para mais detalhes sobre a API Rest, acesse o repositório no github clicando [AQUI!](https://github.com/emerson-roots/curso-spring-MVC-thymeleaf) 

- Este projeto foi gerado através do [Angular CLI](https://github.com/angular/angular-cli) versão 12.0.2.
- Sua hospedagem também foi feita no HEROKU.

# Link do projeto angular na nuvem (HEROKU) e demonstração de telas

- https://angular-frontend-to-spring.herokuapp.com/
- Vale ressaltar que a API consumida por este projeto é protegida por autênticação e autorização através do Spring Security. 

### Demonstração da tela de login e suas credenciais de acesso;
![LOGIN](https://github.com/emerson-roots/assets/blob/master/assets/angular_frontend_to_spring/view_login.jpg)

### Tela HOME
![HOME](https://github.com/emerson-roots/assets/blob/master/assets/angular_frontend_to_spring/view_home.jpg)

### Tela de cadastro de FUNCIONÁRIOS e algumas validações (Acesso ADMINISTRADOR)
![Cadastro e validações](https://github.com/emerson-roots/assets/blob/master/assets/angular_frontend_to_spring/view_insert_validation.jpg)

### Tela de listagem de FUNCIONÁRIOS (Acesso ADMINISTRADOR)
![Listagem](https://github.com/emerson-roots/assets/blob/master/assets/angular_frontend_to_spring/view_list.jpg)

### Tela de erro ao tentar acessar um recurso com perfil de usuário sem autorização (Acesso CONVIDADO)
![Recurso sem permissão](https://github.com/emerson-roots/assets/blob/master/assets/angular_frontend_to_spring/view_access_restricted.jpg)

# Tecnologias utilizadas:

-	Angular 12
-	Node.js
-	HTML/CSS
-	Bootstrap 4
-	JWT (JSON Web Token)

# Como executar o projeto LOCALMENTE

## Pré-requisitos: 
- Angular CLI: 12.0.2
- node.js version 12.18.3
- npm version 6.14.6


```bash
# na linha de comando, clonar repositório
git clone https://github.com/emerson-roots/conversion-thymeleaf-to-angular-project

# entrar na pasta do projeto clonado

# fazer install das dependências através do comando (aguarde o download e instalação):
npm install

# iniciar a aplicação através do comando:
ng serve --open

# se o comando anterior não abrir o navegador automáticamente, 
# teste a aplicação através da URL (lembre-se de confirmar a porta padrão da sua máquina):
http://localhost:4200/ 


# pausar/stopar aplicação
CTRL+C na linha de comando
```


# Autor

*Emerson Melo de Lima*

emerson_sardinha@hotmail.com
