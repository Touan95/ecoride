#!/bin/bash
# Script pour préparer le déploiement Heroku

# Se positionner dans le dossier backend
cd backend

# Remplacer le package.json pour Heroku
if [ -f package.json.heroku ]; then
  cp package.json.heroku package.json
  echo "Package.json remplacé pour Heroku"
fi

# Créer le .npmrc pour Heroku
echo "shamefully-hoist=true" > .npmrc
echo "legacy-peer-deps=true" >> .npmrc
echo "node-linker=hoisted" >> .npmrc

# Retourner à la racine
cd ..

echo "Préparation terminée"