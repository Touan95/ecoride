`backend`
├─ `src`
│ ├─ `api`
│ ├─ `core` - _Utilitaires centraux classés par responsabilités_
│ │ ├─ `database` - _Base de données (processTransaction, SnakeCaseNamingStrategy, ...)_
│ │ ├─ `jwt` - _Tokens (interfaces, génération, verification, ...)_
│ │ ├─ `mailer` - _Emails (configuration, Nodemailer, générateur HBS-HTML, ...)_
│ │ ├─ `middlewares` - _Express middlewares_
│ │ └─ `utils`
│ ├─ `entities` - _Entités BDD TypeORM_
│ ├─ `loader` - _Config et démarrage de l'application backend_
│ ├─ `migrations` - _Migrations BDD TypeORM_
│ ├─ `repositories` - _Communication entre backend et BDD PostgreSQL_
│ ├─ `services`
│ │ └─ `emailSender` - _Fichiers HBS des différents mails transactionnels faits main_
│ ├─ `static`
│ │ └─ `templates` - _Fichiers HBS des différents templates de mails convertis depuis MJML_
│ └─ `utils` - _Utilitaires divers_
