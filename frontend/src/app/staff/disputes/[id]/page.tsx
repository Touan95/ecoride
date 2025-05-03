import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import DisputeDetailPageClient from './client';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await generatePageMetadata({
    templateTitle: seoData[SEO_PAGES.STAFF_DISPUTE_DETAIL].title,
    description: seoData[SEO_PAGES.STAFF_DISPUTE_DETAIL].description,
    defaultMeta: defaultSeoValues,
    noIndex: true,
    noFollow: true
  });

  return metadata;
}

export default function DisputeDetailPage() {
  return <DisputeDetailPageClient />;
}
