#!/bin/bash
echo "Préparation du déploiement Heroku..."

# Se positionner dans le dossier backend
cd backend

# Copier le package.json.heroku en tant que package.json
cp package.json.heroku package.json
echo "Package.json modifié pour Heroku"

# Assurer que les scripts sont exécutables
chmod +x node_modules/.bin/*
echo "Scripts rendus exécutables"

# Retourner à la racine
cd ..

echo "Préparation terminée"