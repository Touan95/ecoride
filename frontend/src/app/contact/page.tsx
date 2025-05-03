import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import ContactPageClient from './client';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await generatePageMetadata({
    templateTitle: seoData[SEO_PAGES.PUBLIC_CONTACT].title,
    description: seoData[SEO_PAGES.PUBLIC_CONTACT].description,
    defaultMeta: defaultSeoValues
  });

  return metadata;
}

export default function RideDetailsPage() {
  return <ContactPageClient />;
}
