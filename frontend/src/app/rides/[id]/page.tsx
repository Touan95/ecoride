import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import RideDetailsPageClient from './client';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await generatePageMetadata({
    templateTitle: seoData[SEO_PAGES.PUBLIC_RIDE_DETAIL].title,
    description: seoData[SEO_PAGES.PUBLIC_RIDE_DETAIL].description,
    defaultMeta: defaultSeoValues
  });

  return metadata;
}

export default function RideDetailsPage() {
  return <RideDetailsPageClient />;
}
