# Développement

## Ajouter un template d'envoi d'email

Assurez-vous de lancer `mailhog` avec `pnpm start:mailhog`.
Mailhog va intercepter tous les emails, vous pouvez les consulter [via son interface](http://localhost:8025/).

Si vous souhaitez ajouter un nouvel email, ça se passe dans [ce dossier](./backend/src/services/emailSender/).

1. Créer un dossier avec le bon nom
2. Ajouter le template qui va être utiliser pour être envoyé
3. Créer un fichier index qui gère le mapping des données et l'envoi de l'email
4. Mettez à jour le fichier index dans `emailSender/index.ts` pour exporter votre nouvelle fonction
5. Utilisez la fonction dans votre endpoint

## Changer le template de l'email

Nous utilisons **MJML** pour modifier les templates des mails.

1. Aller sur l'éditeur en ligne MJML : https://mjml.io/templates
2. Editer jusqu'à obtenir votre résultat
3. Modifier `./backend/mjml/templates/public.template.mjml` (ou `internal`) et surtout ne pas oublier les variables comme `{{> layout }}`
4. Dans le dossier `backend` executez `pnpm run mjml2html`
5. Relancer un endpoint avec un nouvel email
