# churrasco-garantido-node

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

[![Build Status](https://travis-ci.org/LeonardoHabitzreuter/churrasco-garantido-node.svg?branch=master)](https://travis-ci.org/LeonardoHabitzreuter/churrasco-garantido-node)
[![Coverage Status](https://coveralls.io/repos/github/LeonardoHabitzreuter/churrasco-garantido-node/badge.svg?branch=master)](https://coveralls.io/github/LeonardoHabitzreuter/churrasco-garantido-node?branch=master)

# Variáveis de ambiente
 - dbUrl: url de conexão para o banco de dados MongoDB
 - authSecret: secret do token jwt
 É recomendado que seja criado um arquivo .env dentro da pasta src para que essas variáveis não precisem ser setadas sempre

# Rodando a app em ambiente de desenvolvimento

**Usando docker:**
 - ***docker image build -t churrasco-garantido-node -f Dockerfile-dev .***
 - ***docker container run -dp 3001:3001 --name backend churrasco-garantido-node***
 - A aplicação estará disponível no endereço **http://localhost:3001**
 
 **Usando docker compose:**
 - Também é necessário que você tenha o [repositório](github.com/LeonardoHabitzreuter/churrasco-garantido-front) da aplicação frontend na sua máquina local
 - ***docker-compose up -d***
 - O arquivo compose lê os arquivos "Dockerfile-dev", então não é necessária alguma configuração adicional.

 **Sem usar docker:**
 - ***npm install***
 - ***npm start***
 - A aplicação estará disponível no endereço **http://localhost:3001**

# Gerando a imagem docker para ambientes de produção
 - Execute o arquivo "build" passando como argumento a versao da aplicação:
 - ***sudo bash release.sh 1.0.0***
 - Este arquivo shell irá fazer build da aplicação e também de sua imagem para produção
 - Cheque se a imagem foi criada corretamente:
 - ***docker image ls***

# Variáveis de ambiente:
 - authSecret: Segredo do token JWT
 - dbUrl: String de conexão com o mongoDB

**Importante !!**

A parte frontend deste projeto foi movida para este repositório [churrasco-garantido-front](https://github.com/LeonardoHabitzreuter/churrasco-garantido-front)
