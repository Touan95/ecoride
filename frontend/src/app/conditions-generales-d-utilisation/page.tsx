import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import TermsOfUsePageClient from './client';

export const metadata: Metadata = await generatePageMetadata({
  templateTitle: seoData[SEO_PAGES.PUBLIC_TERMS_OF_USE].title,
  description: seoData[SEO_PAGES.PUBLIC_TERMS_OF_USE].description,
  defaultMeta: defaultSeoValues,
  canonicalPath: 'conditions-generales-d-utilisation'
});

export default function TermsOfUsePage() {
  return <TermsOfUsePageClient />;
}
