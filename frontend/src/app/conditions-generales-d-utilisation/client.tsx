import { Typography } from '@/components/atoms/Typography';

export default function TermsOfUsePageClient() {
  return (
    <div className="prose max-w-3xl mx-auto px-4 py-10 text-foreground gap-5 flex flex-col">
      <Typography variant="h1" tag="h1">
        Conditions Générales d’Utilisation
      </Typography>

      <Typography variant="h2" tag="h2">
        1. Objet
      </Typography>
      <Typography>
        Les présentes Conditions Générales d’Utilisation (CGU) ont pour objet de définir les règles d’accès et d’usage de la plateforme
        EcoRide. L’utilisation du service implique l’acceptation sans réserve des présentes CGU.
      </Typography>

      <Typography variant="h2" tag="h2">
        2. Description du service
      </Typography>
      <Typography>
        EcoRide est une plateforme fictive de covoiturage permettant la mise en relation entre conducteurs et passagers. Le service comprend
        notamment : l’inscription, la création de trajets, la réservation, la gestion des avis, et la modération par un personnel dédié.
      </Typography>

      <Typography variant="h2" tag="h2">
        3. Accès au service
      </Typography>
      <Typography>
        L’accès est réservé aux utilisateurs disposant d’un compte. L’inscription implique l’acceptation des présentes CGU et de la
        politique de confidentialité.
      </Typography>

      <Typography variant="h2" tag="h2">
        4. Engagements des utilisateurs
      </Typography>
      <Typography>
        L’utilisateur s’engage à fournir des informations exactes, à respecter les autres membres, à ne pas publier de contenu illicite ou
        abusif, et à utiliser la plateforme conformément à sa finalité.
      </Typography>

      <Typography variant="h2" tag="h2">
        5. Suspension de compte
      </Typography>
      <Typography>
        L’équipe d’administration se réserve le droit de suspendre ou supprimer un compte en cas de non-respect des CGU, comportement abusif
        ou usage frauduleux.
      </Typography>

      <Typography variant="h2" tag="h2">
        6. Propriété intellectuelle
      </Typography>
      <Typography>
        Tous les éléments du site (contenus, textes, logo, code source) sont protégés par le droit d’auteur. Toute reproduction est
        interdite sans autorisation.
      </Typography>

      <Typography variant="h2" tag="h2">
        7. Limitation de responsabilité
      </Typography>
      <Typography>
        EcoRide étant un projet fictif, aucune responsabilité ne saurait être engagée concernant les données ou actions simulées via la
        plateforme.
      </Typography>

      <Typography variant="h2" tag="h2">
        8. Modification des CGU
      </Typography>
      <Typography>
        Les présentes CGU peuvent être modifiées à tout moment. Les utilisateurs seront informés de toute mise à jour significative.
      </Typography>

      <Typography variant="h2" tag="h2">
        9. Contact
      </Typography>
      <Typography>
        Pour toute question relative à cette politique de confidentialité, vous pouvez nous écrire à :<br />
        📧 anthony.hoang@snowpact.com
      </Typography>
    </div>
  );
}
