import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import RidesPageClient from './client';

export const metadata: Metadata = await generatePageMetadata({
  templateTitle: seoData[SEO_PAGES.PUBLIC_RIDE_LIST].title,
  description: seoData[SEO_PAGES.PUBLIC_RIDE_LIST].description,
  defaultMeta: defaultSeoValues,
  canonicalPath: 'trajets'
});

export default function RidesPage() {
  return <RidesPageClient />;
}
