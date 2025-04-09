#!/bin/bash
# Exécute le script de préparation
./heroku-build.sh

# Continue avec la construction standard
cd backend
npm install --legacy-peer-deps
npm run build