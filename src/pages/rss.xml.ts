import rss from '@astrojs/rss';
import { getBlogPosts } from '../lib/blog';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(context: any) {
  const posts = getBlogPosts();

  return rss({
    title: 'Mi Blog',
    description: 'Artículos sobre tecnología, ciberseguridad y desarrollo web',
    site: context.site || 'https://blog.riquelmes.com',
    items: posts.map(post => ({
      title: escapeXml(post.data.title),
      pubDate: post.data.date || new Date(),
      description: escapeXml(post.data.description || `Artículo: ${post.data.title}`),
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>es-ES</language>`,
  });
}
