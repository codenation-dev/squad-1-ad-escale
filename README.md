# Projeto Squad 1

Projeto da Codenation com parceria da empresa Escale. 

## Objetivo

Plataforma web para publicação e busca de animais perdidos, achados ou disponíveis para adoção.

## Resultado

http://getpet.surge.sh

## Front end

Utilizamos as tecnologias: Reactjs, Material UI, HTML, CSS e para publicação do site, utilizamos o surge.
O projeto foi inicializado utilizando o boilerplate do React (create-react-app), na versão 16.8.6.
Criamos um repositório github conectado ao Circle CI, a cada merge através de PR na master, é disparado um build para o surge.

### Pré requisitos

1. Nodejs (stable version)
2. npm

### Ambiente de desenvolvimento

Para visualizar localmente a aplicação, é necessário realizar o download deste repositório, acessar a pasta squad-1-ad-escale, Frontend, e instalar as dependências:

```shell
cd squad-1-ad-escale
cd Frontend
npm install
```
Após instalar as dependências, executar o comando de inicialização do projeto:

```shell
npm start
```

### Build do projeto

Caso queria buildar o projeto e gerar um bundle:

```shell
npm build
```
Os arquivos serão gerados na pasta build/

## Back end

Utilizamos as tecnologias: Python Django, banco de dados SQLite e pythonanywhere como PaaS.

Criamos um repositório github e criamos um webhook, onde a cada merge através de PR na master, é disparado um build para o pythonanywhere.

### Pré requisitos

1. Python (latest stable version)
2. pip

### Ambiente de desenvolvimento

Para visualizar localmente a aplicação, é necessário realizar o download deste repositório, acessar a pasta squad-1-ad-escale, Backend:

```shell
cd squad-1-ad-escale
cd Backend
```

Criar o ambiente virtual, ativar o ambiente virtual, instalar as dependências:

```shell
pip3 install virtualenv
virtualenv venv -p python3
source venv/bin/activate 
pip install -r requirements.txt
```

Executar as migrações e executar o comando de inicialização do projeto:

```shell
manage.py migrate
manage.py runserver
```
