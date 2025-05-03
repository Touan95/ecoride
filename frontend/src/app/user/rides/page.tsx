import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import UserRidesPageClient from './client';

export const metadata: Metadata = await generatePageMetadata({
  templateTitle: seoData[SEO_PAGES.USER_RIDES].title,
  description: seoData[SEO_PAGES.USER_RIDES].description,
  defaultMeta: defaultSeoValues,
  noIndex: true,
  noFollow: true
});

export default function UserRidesPage() {
  return <UserRidesPageClient />;
}
