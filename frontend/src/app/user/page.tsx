import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import UserPageClient from './client';

export const metadata: Metadata = await generatePageMetadata({
  templateTitle: seoData[SEO_PAGES.USER_ACCOUNT].title,
  description: seoData[SEO_PAGES.USER_ACCOUNT].description,
  defaultMeta: defaultSeoValues,
  noIndex: true,
  noFollow: true
});

export default function UserPage() {
  return <UserPageClient />;
}
