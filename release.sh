#!/bin/sh

version=${1:-'latest'}
git tag -a ${version} -m ${version}
git push origin --tags
npm run build
docker image build -t leonardohabitzreuter/churrasco-garantido-node:${version} .
docker image push leonardohabitzreuter/churrasco-garantido-node:${version}
