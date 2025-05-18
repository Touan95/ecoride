import { Typography } from '@/components/atoms/Typography';

export default function PrivacyPolicyPageClient() {
  return (
    <div className="prose max-w-3xl mx-auto px-4 py-10 text-foreground gap-5 flex flex-col">
      <Typography variant="h1" tag="h1">
        Politique de confidentialité
      </Typography>

      <Typography>
        <strong>Dernière mise à jour : mai 2025</strong>
      </Typography>

      <Typography>
        Le site <strong>EcoRide</strong> (https://ecoride-sooty.vercel.app) a été conçu dans le cadre d’un{' '}
        <strong>projet fictif de formation professionnelle</strong> au métier de développeur web. Bien que le site soit en ligne à des fins
        de démonstration, aucune exploitation commerciale n’est réalisée.
      </Typography>

      <Typography>
        Nous nous engageons à protéger les données personnelles que vous pourriez nous transmettre, notamment via le{' '}
        <strong>formulaire de contact</strong>.
      </Typography>

      <Typography variant="h2" tag="h2">
        1. Responsable du traitement
      </Typography>
      <Typography>
        Le responsable du traitement est :<br />
        <strong>Anthony HOANG</strong>
        <br />
        Développeur web – projet EcoRide
        <br />
        📧 anthony.hoang@snowpact.com
      </Typography>

      <Typography variant="h2" tag="h2">
        2. Données collectées
      </Typography>
      <Typography>Via le formulaire de contact, nous collectons uniquement les données suivantes :</Typography>
      <ul>
        <li>
          <Typography>Nom (champ libre)</Typography>
        </li>
        <li>
          <Typography>Adresse e-mail</Typography>
        </li>
        <li>
          <Typography>Contenu du message</Typography>
        </li>
      </ul>
      <Typography>
        En dehors du formulaire de contact, d&apos;autres données peuvent être collectées lors de l&apos;utilisation de la plateforme :
      </Typography>
      <ul>
        <li>
          <Typography>Adresse e-mail (inscription, réservation, création de compte staff)</Typography>
        </li>
        <li>
          <Typography>Plaque d&apos;immatriculation (ajout de véhicule, création de trajet)</Typography>
        </li>
        <li>
          <Typography>Adresse de départ et d&apos;arrivée d&apos;un trajet (seule la ville est visible publiquement)</Typography>
        </li>
        <li>
          <Typography>Consentement explicite (via cases à cocher) à la politique de confidentialité et aux CGU</Typography>
        </li>
        <li>
          <Typography>Consentement explicite à la transmission de l’e-mail du passager au conducteur (réservation)</Typography>
        </li>
      </ul>
      <Typography>Aucune autre donnée n’est collectée, stockée ou analysée à des fins statistiques, commerciales ou marketing.</Typography>

      <Typography variant="h2" tag="h2">
        3. Finalité du traitement
      </Typography>
      <Typography>
        Les données que vous fournissez sont utilisées uniquement pour répondre à votre message. Certaines données (comme la plaque
        d’immatriculation ou l’adresse e-mail) sont nécessaires au bon fonctionnement des services proposés (ex. : organisation d’un trajet,
        création d’un véhicule). D’autres, comme le consentement à la transmission d’un e-mail entre utilisateurs, visent à garantir une
        communication logistique dans un cadre sécurisé et transparent. Elles ne sont ni transmises à des tiers, ni utilisées à
        d&apos;autres fins.
      </Typography>

      <Typography variant="h2" tag="h2">
        4. Durée de conservation
      </Typography>
      <Typography>
        Les messages reçus via le formulaire de contact sont conservés pendant une durée maximale de <strong>3 mois</strong>, uniquement
        dans le cadre du suivi du projet. Ils sont ensuite supprimés.
        <br />
        Les consentements (acceptation des CGU, autorisation de partager l’e-mail passager) sont horodatés et conservés à des fins de
        traçabilité pendant toute la durée d’existence du compte utilisateur.
      </Typography>

      <Typography variant="h2" tag="h2">
        5. Sécurité des données
      </Typography>
      <Typography>
        Les données transmises sont envoyées de manière sécurisée via HTTPS. Elles ne sont pas stockées dans une base de données, mais
        transmises par e-mail au responsable du projet, via un service SMTP configuré sur le backend.
        <br />
        Les informations sensibles, comme les mots de passe ou les e-mails transmis entre utilisateurs, sont traitées de manière sécurisée.
        Aucune adresse e-mail n’est rendue publique ; elles ne sont partagées qu’après consentement explicite et uniquement entre
        utilisateurs concernés.
      </Typography>

      <Typography variant="h2" tag="h2">
        6. Vos droits
      </Typography>
      <Typography>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</Typography>
      <ul>
        <li>
          <Typography>Droit d’accès à vos données</Typography>
        </li>
        <li>
          <Typography>Droit de rectification</Typography>
        </li>
        <li>
          <Typography>Droit d’effacement (droit à l’oubli)</Typography>
        </li>
        <li>
          <Typography>Droit d’opposition au traitement</Typography>
        </li>
      </ul>
      <Typography>Vous pouvez exercer ces droits à tout moment en envoyant un e-mail à : anthony.hoang@snowpact.com</Typography>

      <Typography variant="h2" tag="h2">
        7. Cookies
      </Typography>
      <Typography>
        Le site n’utilise que des cookies <strong>techniques et essentiels</strong> au bon fonctionnement de l’interface. Aucun cookie
        publicitaire, d’analyse ou de suivi tiers n’est utilisé.
      </Typography>

      <Typography variant="h2" tag="h2">
        8. Projet fictif
      </Typography>
      <Typography>
        Ce site est un projet <strong>non commercial</strong>, réalisé dans le cadre d’une formation diplômante. Les données éventuellement
        collectées le sont à titre de démonstration. Aucune démarche commerciale, aucune revente ni profilage n’est effectué.
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
