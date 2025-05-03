import { Typography } from '@/components/atoms/Typography';

export default function LegalPageClient() {
  return (
    <div className="prose max-w-3xl mx-auto px-4 py-10 text-foreground gap-5 flex flex-col">
      <Typography variant="h1" tag="h1">
        Mentions légales
      </Typography>

      <Typography variant="h2" tag="h2">
        Projet pédagogique – Avertissement
      </Typography>
      <Typography>
        Le site <strong>EcoRide</strong> a été conçu et développé dans le cadre d’un <strong>projet d’école non lucratif</strong>, à
        l’occasion de la préparation au <strong>Titre Professionnel Développeur Web et Web Mobile</strong>. Il s’agit d’une plateforme
        fictive à visée exclusivement pédagogique, sans activité commerciale réelle. Toute donnée affichée (trajets, utilisateurs, avis) est
        soit simulée, soit anonymisée.
      </Typography>

      <Typography variant="h2" tag="h2">
        Éditeur du site
      </Typography>
      <Typography>
        Le présent site est édité par : <br />
        <strong>EcoRide</strong> – Plateforme de covoiturage écologique (projet fictif)
        <br />
        Responsable de la publication : Anthony Hoang <br />
        Adresse e-mail : anthony.hoang@snowpact.com <br />
        Numéro de SIRET : projet pédagogique – non applicable <br />
        Siège social : projet fictif – non applicable
      </Typography>

      <Typography variant="h2" tag="h2">
        Hébergement
      </Typography>
      <Typography>
        Le site est hébergé par :<br />
        <strong>Vercel Inc.</strong>
        <br />
        340 S Lemon Ave #4133
        <br />
        Walnut, CA 91789, États-Unis
        <br />
        <a href="https://vercel.com">https://vercel.com</a>
      </Typography>

      <Typography variant="h2" tag="h2">
        Stockage des données
      </Typography>
      <ul>
        <li>
          <Typography>
            <strong>Supabase</strong> : hébergement PostgreSQL – Europe
          </Typography>
        </li>
        <li>
          <Typography>
            <strong>MongoDB Atlas</strong> : gestion des avis – Europe
          </Typography>
        </li>
        <li>
          <Typography>
            <strong>Brevo (Sendinblue)</strong> : envoi d’e-mails transactionnels
          </Typography>
        </li>
      </ul>

      <Typography variant="h2" tag="h2">
        Développement
      </Typography>
      <Typography>
        Site réalisé par <strong>Anthony Hoang</strong>, dans le cadre de sa reconversion professionnelle et de la validation du titre RNCP
        de développeur web.
      </Typography>

      <Typography variant="h2" tag="h2">
        Propriété intellectuelle
      </Typography>
      <Typography>
        Les contenus (textes, illustrations, logos, code) sont protégés par le droit d’auteur. Toute reproduction ou réutilisation est
        interdite sans accord préalable. L’usage est limité au cadre pédagogique.
      </Typography>

      <Typography variant="h2" tag="h2">
        Conditions d’utilisation
      </Typography>
      <Typography>
        L’utilisation du site est libre et gratuite dans un cadre non commercial. Aucune transaction réelle n’est effectuée. Les services
        présentés sont fictifs et ne donnent lieu à aucun engagement contractuel.
      </Typography>

      <Typography variant="h2" tag="h2">
        Données personnelles
      </Typography>
      <Typography>
        Des données peuvent être collectées à des fins de test uniquement.
        <br />
        Conformément au <strong>RGPD</strong>, vous pouvez demander la suppression de toute donnée vous concernant via l’adresse :
        anthony.hoang@snowpact.com.
        <br />
        Aucune donnée n’est cédée à des tiers.
      </Typography>

      <Typography variant="h2" tag="h2">
        Cookies
      </Typography>
      <Typography>
        Des cookies techniques peuvent être utilisés pour simuler des sessions ou améliorer l’expérience utilisateur. Aucun cookie
        publicitaire n’est mis en place.
      </Typography>

      <Typography variant="h2" tag="h2">
        Responsabilité
      </Typography>
      <Typography>
        L’auteur ne saurait être tenu responsable d’un usage inapproprié du site ou d’une mauvaise interprétation de son statut fictif.
      </Typography>

      <Typography variant="h2" tag="h2">
        Contact
      </Typography>
      <Typography>
        Pour toute remarque ou demande liée au projet :<br />
        📧 anthony.hoang@snowpact.com
      </Typography>
    </div>
  );
}
