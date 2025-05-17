import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import LegalPageClient from './client';

export const metadata: Metadata = await generatePageMetadata({
  templateTitle: seoData[SEO_PAGES.PUBLIC_PRIVACY_POLICY].title,
  description: seoData[SEO_PAGES.PUBLIC_PRIVACY_POLICY].description,
  defaultMeta: defaultSeoValues,
  canonicalPath: 'politique-de-confidentialite'
});

export default function LegalPage() {
  return <LegalPageClient />;
}
