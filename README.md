# churrasco-garantido-node

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

[![Build Status](https://travis-ci.org/LeonardoHabitzreuter/churrasco-garantido-node.svg?branch=master)](https://travis-ci.org/LeonardoHabitzreuter/churrasco-garantido-node)
[![Coverage Status](https://coveralls.io/repos/github/LeonardoHabitzreuter/churrasco-garantido-node/badge.svg?branch=master)](https://coveralls.io/github/LeonardoHabitzreuter/churrasco-garantido-node?branch=master)

# Variáveis de ambiente
 - dbUrl: url de conexão para o banco de dados MongoDB
 - authSecret: secret do token jwt
 Para o ambiente de desenvolvimento é recomendado que seja criado um arquivo .env dentro da pasta src para que essas variáveis não precisem ser setadas sempre

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

## Versionamento

Usamos [SemVer](http://semver.org/) para versionamento. Para as versões disponíveis verifique [tags nesse repositorio](https://github.com/LeonardoHabitzreuter/tags). 

# Criando uma nova versão da aplicação
 - Execute o arquivo "build" passando como argumento a versao da aplicação:
 - ***sudo bash release.sh 1.0.0***
 - Este arquivo shell irá:
 * Versionar o projeto
 * Criar a imagem Docker da app para rodar em ambiente de produção
 * Fazer push da imagem para o [Docker Hub](https://hub.docker.com/r/leonardohabitzreuter/churrasco-garantido-node/)
 - Após isso adicione as release notes da nova versão [aqui](https://github.com/LeonardoHabitzreuter/tags) e atualize o ambiente de produção para usar a nova versão da aplicação

**Importante !!**

A parte frontend deste projeto foi movida para este repositório [churrasco-garantido-front](https://github.com/LeonardoHabitzreuter/churrasco-garantido-front)
