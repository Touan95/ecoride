import { DefaultSeoProps } from '@/utils/seo';
import { urlJoin } from '@/utils/url';

export const defaultSeoValues: DefaultSeoProps = {
  title: 'Plateforme de covoiturage écologique et solidaire - EcoRide',
  description:
    'Voyagez autrement avec EcoRide : trouvez ou proposez un trajet en voiture électrique, partagez les frais et réduisez votre empreinte carbone.',
  siteName: 'Ecoride',
  websiteUrl: 'https://ecoride-sooty.vercel.app',
  shareImage: urlJoin('/assets/large-og.webp'),
  robots: 'index, follow',
  sitemapUrl: '/sitemap.xml',
  rssUrl: undefined,
  twitterHandle: undefined,
  keywords: ['covoiturage, écologie, mobilité, trajets, voiture électrique, Ecoride']
};
