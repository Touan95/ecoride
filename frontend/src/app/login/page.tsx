import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import LoginPageClient from './client';

export const metadata: Metadata = await generatePageMetadata({
  templateTitle: seoData[SEO_PAGES.PUBLIC_AUTH].title,
  description: seoData[SEO_PAGES.PUBLIC_AUTH].description,
  defaultMeta: defaultSeoValues
});

export default function LoginPage() {
  return <LoginPageClient />;
}
