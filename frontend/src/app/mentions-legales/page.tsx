import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import LegalPageClient from './client';

export const metadata: Metadata = await generatePageMetadata({
  templateTitle: seoData[SEO_PAGES.PUBLIC_LEGAL_MENTIONS].title,
  description: seoData[SEO_PAGES.PUBLIC_LEGAL_MENTIONS].description,
  defaultMeta: defaultSeoValues
});

export default function LegalPage() {
  return <LegalPageClient />;
}
