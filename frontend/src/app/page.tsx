import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata, Viewport } from 'next';
import HomePageClient from './client';

export const metadata: Metadata = await generatePageMetadata({
  templateTitle: seoData[SEO_PAGES.PUBLIC_HOME_PAGE].title,
  description: seoData[SEO_PAGES.PUBLIC_HOME_PAGE].description,
  defaultMeta: defaultSeoValues
});

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  userScalable: false,
  viewportFit: 'cover'
};

export default function HomePage() {
  return <HomePageClient />;
}
