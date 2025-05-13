import { Metadata } from 'next';

export type DefaultSeoProps = {
  title: string;
  description: string;
  shareImage: string;
  websiteUrl: string;
  siteName: string;
  robots?: string;
  twitterHandle?: string;
  rssUrl?: string;
  sitemapUrl?: string;
  keywords?: string[];
};

type PageSeoProps = {
  title?: string;
  templateTitle?: string;
  description?: string;
  defaultMeta: DefaultSeoProps;
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalPath?: string;
};

const getRobotsContent = (noIndex: boolean, noFollow: boolean) => {
  if (noIndex && noFollow) return 'noindex, nofollow';
  if (noIndex) return 'noindex, follow';
  if (noFollow) return 'index, nofollow';
  return 'index, follow';
};

export const generatePageMetadata = async ({
  title,
  templateTitle,
  description,
  noIndex,
  noFollow,
  defaultMeta,
  canonicalPath
}: PageSeoProps): Promise<Metadata> => {
  const metaTitle = templateTitle ? `${templateTitle} - ${defaultMeta.siteName}` : (title ?? defaultMeta.title);

  const metaDescription = description ?? defaultMeta.description;

  const metaRobots = noIndex && noFollow ? getRobotsContent(noIndex, noFollow) : defaultMeta.robots;

  return {
    title: metaTitle,
    robots: metaRobots,
    description: metaDescription,
    alternates: {
      canonical: canonicalPath ? `${defaultMeta.websiteUrl}/${canonicalPath}` : defaultMeta.websiteUrl,
      types: {
        'application/rss+xml': defaultMeta.rssUrl ?? null
      }
    },
    keywords: defaultMeta.keywords,
    openGraph: {
      url: defaultMeta.websiteUrl,
      type: 'website',
      siteName: defaultMeta.siteName,
      description: metaDescription,
      title: metaTitle,
      images: [
        {
          url: defaultMeta.shareImage
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: defaultMeta.twitterHandle ?? undefined,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: defaultMeta.shareImage
        }
      ]
    },
    icons: {
      apple: '/favicon/apple-touch-icon.png',
      icon: '/favicon/favicon.ico',
      shortcut: '/favicon.ico'
    },
    manifest: '/manifest.json'
  };
};
