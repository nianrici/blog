import rss from '@astrojs/rss';
import { getBlogPosts } from '../lib/blog';

export async function GET(context) {
  const posts = getBlogPosts();
  
  return rss({
    title: 'Mi Blog',
    description: 'Artículos sobre tecnología, ciberseguridad y desarrollo web',
    site: context.site || 'https://example.com',
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date || new Date(),
      description: post.data.description || `Artículo: ${post.data.title}`,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>es-ES</language>`,
  });
}
