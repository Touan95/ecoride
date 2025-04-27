`Router` → Routeur principal `/`
├─ `publicRouter = Router()` → Pas protection via jwtMiddleware
│ ├─ `authenticationRouter` (Routes d’authentification)
│ │ ├─ **POST** `/register` - _Inscription d’un nouvel utilisateur_
│ │ ├─ **POST** `/login` - _Connexion (génération de JWT)_
│ │ ├─ **POST** `/testMail` - _Endpoint de test d'envoi de mail_
│ │ └─ **POST** `/refresh` - _Rafraîchissement du token JWT_
│ └─ `publicRideRouter` (Consultation des trajets)
│ ├─ **GET** `/rides` - _Recherche de trajets_
│ ├─ **GET** `/ride/:rideId` - _Détails d’un trajet_
│ └─ **GET** `/ride/:rideId/reviews` - _Avis d'un trajet_
│
├─ `userRouter = Router().use(jwtMiddleware({}))` → Protection via jwtMiddleware (utilisateur authentifié)
│ ├─ **GET** `/user/me` - _Récupère les infos du profil connecté_
│ ├─ **PATCH** `/user/:userId/type` - _Change le type d’utilisateur_
│ ├─ **PATCH** `/user/password` - _Modifie le mot de passe_
│ ├─ **PATCH** `/user/:userId/driver` - _Met à jour les préférences de conducteur_
│ ├─ **GET** `/user/:userId` - _Récupère un utilisateur_
│ ├─ `userCarRouter` (Gestion des véhicules d'un utilisateur)
│ │ ├─ **POST** `/user/:userId/car` - _Ajout d’un véhicule_
│ │ ├─ **PUT** `/user/:userId/car/:carId` - _Modifie un véhicule_
│ │ └─ **PATCH** `/user/:userId/car/:carId` - _Suppression (logique) d’un véhicule_
│ └─ `userRideRouter` (Gestion des trajets d'un utilisateur)
│ ├─ **POST** `/user/:userId/ride/add` - _Ajout d'un nouveau trajet_
│ ├─ **PUT** `/user/ride/:rideId/book` - _Réserve une place_
│ ├─ **GET** `/user/rides/passenger` - _Liste des trajets en tant que passager_
│ ├─ **GET** `/user/rides/driver` - _Liste des trajets en tant que conducteur_
│ ├─ **PATCH** `/user/ride/:rideId/cancel/passenger` - _Annule une réservation (passager)_
│ ├─ **PATCH** `/user/ride/:rideId/cancel/driver` - _Annule un trajet (conducteur)_
│ ├─ **PATCH** `/user/ride/:rideId/start` - _Démarre un trajet (conducteur)_
│ ├─ **PATCH** `/user/ride/:rideId/end` - _Termine un trajet (conducteur)_
│ └─ **POST** `/user/ride/:rideId/review` - _Ajoute un avis sur un trajet (passager)_
│
├─ `staffRouter = Router().use(jwtMiddleware({ requiresStaff: true }))` → Protection via jwtMiddleware (utilisateur STAFF)
│ ├─ **GET** `/staff/reviews` - _Liste des avis en attente de modération_
│ ├─ **GET** `/staff/review/:reviewId` - _Détail d’un avis_
│ ├─ **PATCH** `/staff/review/:reviewId/approve` - _Approuve un avis_
│ └─ **PATCH** `/staff/review/:reviewId/dispute` - _Résout un litige_
│
└─ `adminRouter = Router().use(jwtMiddleware({ requiresAdmin: true }))` → Protection via jwtMiddleware (utilisateur ADMIN)
├─ **GET** `/admin/statistics` - _Statistiques globales_
├─ **GET** `/admin/staff` - _Liste de tous le staff_
├─ **PATCH** `/admin/user/:userId/block` - _Bloque un utilisateur_
├─ **PATCH** `/admin/user/:userId/unblock` - _Débloque un utilisateur_
├─ **GET** `/admin/users/blocked` - _Liste des utilisateurs bloqués_
├─ **PATCH** `/admin/user/:email/staff` - _Attribue les droits STAFF_
└─ **GET** `/admin/user` - _Récupère un utilisateur_
