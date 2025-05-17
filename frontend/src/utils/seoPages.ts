export enum SEO_PAGES {
  PUBLIC_HOME_PAGE = 'public-home-page',
  PUBLIC_RIDE_LIST = 'public-ride-list',
  PUBLIC_RIDE_DETAIL = 'public-ride-detail',
  PUBLIC_CONTACT = 'public-contact',
  PUBLIC_LEGAL_MENTIONS = 'public-legal-mentions',
  PUBLIC_PRIVACY_POLICY = 'public-privacy-policy',
  PUBLIC_AUTH = 'public-auth',
  PUBLIC_NOT_FOUND = 'public-not-found',
  USER_ACCOUNT = 'user-account',
  USER_ADD_RIDE = 'user-add-ride',
  USER_RIDES = 'user-rides',
  ADMIN_DASHBOARD = 'admin-dashboard',
  STAFF_DASHBOARD = 'staff-dashboard',
  STAFF_DISPUTE_DETAIL = 'staff-dispute-detail'
}

export const seoData: Record<SEO_PAGES, { title: string; description: string }> = {
  [SEO_PAGES.PUBLIC_HOME_PAGE]: {
    title: 'Plateforme de covoiturage écologique et solidaire',
    description:
      'Voyagez autrement avec EcoRide : trouvez ou proposez un trajet en voiture électrique, partagez les frais et réduisez votre empreinte carbone.'
  },
  [SEO_PAGES.PUBLIC_RIDE_LIST]: {
    title: 'Rechercher un covoiturage',
    description:
      'Comparez les trajets disponibles en quelques clics : départ, arrivée, date, prix, véhicules électriques… Le futur du covoiturage est là.'
  },
  [SEO_PAGES.PUBLIC_RIDE_DETAIL]: {
    title: 'Détail du trajet',
    description:
      'Consultez toutes les informations d’un trajet : conducteur, véhicule, nombre de places, préférences, avis et type de motorisation.'
  },
  [SEO_PAGES.PUBLIC_CONTACT]: {
    title: 'Contactez notre équipe',
    description: 'Une question, un souci ou une suggestion ? Écrivez-nous via notre formulaire ou à l’adresse email indiquée.'
  },
  [SEO_PAGES.PUBLIC_LEGAL_MENTIONS]: {
    title: 'Mentions légales',
    description: 'Retrouvez ici les informations juridiques concernant le site EcoRide, ses éditeurs et ses obligations légales.'
  },
  [SEO_PAGES.PUBLIC_AUTH]: {
    title: 'Connexion / Inscription',
    description: 'Connectez-vous à votre espace personnel ou créez un compte pour réserver ou proposer des trajets sur EcoRide.'
  },
  [SEO_PAGES.USER_ACCOUNT]: {
    title: 'Mon compte',
    description:
      'Gérez vos informations personnelles, vos préférences de trajet (animaux, fumeurs, etc.) et votre profil conducteur ou passager.'
  },
  [SEO_PAGES.USER_ADD_RIDE]: {
    title: 'Proposer un trajet',
    description: 'Indiquez votre destination, vos disponibilités et les détails du véhicule pour publier une annonce de covoiturage.'
  },
  [SEO_PAGES.USER_RIDES]: {
    title: 'Mon historique de trajets',
    description: 'Accédez à l’historique de vos trajets en tant que conducteur ou passager, visualisez les avis et gérez vos annulations.'
  },
  [SEO_PAGES.ADMIN_DASHBOARD]: {
    title: 'Espace administrateur',
    description:
      'Visualisez les statistiques d’utilisation, gérez les comptes employés et les utilisateurs bloqués via l’espace administrateur sécurisé.'
  },
  [SEO_PAGES.STAFF_DASHBOARD]: {
    title: 'Espace modération',
    description: 'Validez les avis des passagers, gérez les signalements et contribuez à la qualité des trajets sur la plateforme.'
  },
  [SEO_PAGES.STAFF_DISPUTE_DETAIL]: {
    title: 'Détail du litige',
    description: 'Consultez les détails d’un litige et arbitrez les réclamations entre passagers et conducteurs.'
  },
  [SEO_PAGES.PUBLIC_NOT_FOUND]: {
    title: 'Page non trouvée',
    description: 'La page que vous cherchez n’existe pas.'
  },
  [SEO_PAGES.PUBLIC_PRIVACY_POLICY]: {
    title: 'Politique de confidentialité',
    description: 'Découvrez comment EcoRide protège vos données personnelles et respecte votre vie privée.'
  }
};
