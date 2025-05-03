import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import StaffPageClient from './client';

export const metadata: Metadata = await generatePageMetadata({
  templateTitle: seoData[SEO_PAGES.STAFF_DASHBOARD].title,
  description: seoData[SEO_PAGES.STAFF_DASHBOARD].description,
  defaultMeta: defaultSeoValues,
  noIndex: true,
  noFollow: true
});

export default function StaffPage() {
  return <StaffPageClient />;
}
