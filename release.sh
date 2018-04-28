#!/bin/sh

imageTag=${1:-'latest'}
npm run build
docker image build -t leonardohabitzreuter/churrasco-garantido-node:${imageTag} .