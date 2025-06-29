#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git checkout -b gh-pages
git remote add origin 'https://github.com/pascompsmma/acervo-fotos.git'
git add -A
git commit -m "Novo Deploy"
git push origin -f gh-pages

cd -
