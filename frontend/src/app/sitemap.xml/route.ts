import { NextResponse } from 'next/server';
import { SitemapStream, EnumChangefreq } from 'sitemap';

const STATIC_PAGE_LIST = [
  { url: '/', priority: 1, changefreq: EnumChangefreq.MONTHLY },
  { url: '/rides/', priority: 1, changefreq: EnumChangefreq.MONTHLY },
  { url: '/login/', priority: 1, changefreq: EnumChangefreq.MONTHLY },
  { url: '/contact/', priority: 1, changefreq: EnumChangefreq.MONTHLY },
  { url: '/mentions-legales/', priority: 0.3, changefreq: EnumChangefreq.YEARLY }
];

// Helper to convert a stream to a string
async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks: string[] = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? chunk : chunk.toString());
  }
  return chunks.join('');
}

export async function GET() {
  const stream = new SitemapStream({ hostname: 'https://ecoride-sooty.vercel.app' });

  for (const page of STATIC_PAGE_LIST) {
    stream.write(page);
  }
  stream.end();

  const sitemap = await streamToString(stream);

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=43200, stale-while-revalidate'
    }
  });
}
