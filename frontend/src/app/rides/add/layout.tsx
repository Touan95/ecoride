import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import AddRidePage from './page';

export const metadata: Metadata = await generatePageMetadata({
  templateTitle: seoData[SEO_PAGES.USER_ADD_RIDE].title,
  description: seoData[SEO_PAGES.USER_ADD_RIDE].description,
  defaultMeta: defaultSeoValues,
  noIndex: true,
  noFollow: true
});

export default function AddRideLayout() {
  return <AddRidePage />;
}
