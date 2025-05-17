import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '@/components/atoms/Typography';
import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import { ROUTES } from '@/configs/routes';

export const metadata: Metadata = await generatePageMetadata({
  templateTitle: seoData[SEO_PAGES.PUBLIC_NOT_FOUND].title,
  description: seoData[SEO_PAGES.PUBLIC_NOT_FOUND].description,
  defaultMeta: defaultSeoValues,
  noIndex: true,
  noFollow: true
});

export default function NotFound() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-4">
      <Image src="/assets/404.webp" height={600} width={600} alt="404" />
      <div className="flex flex-col gap-4">
        <Typography variant="cardTitle" tag="h1">
          Page non trouvée
        </Typography>
        <Link href={ROUTES.HOME} className="hover:underline underline-offset-4 decoration-primary-900">
          <Typography variant="cardTitleSm" tag="h2">
            Retour à l&apos;accueil
          </Typography>
        </Link>
      </div>
    </div>
  );
}
