import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { formatDate, href, sortPosts } from '@/lib/content';

export const GET: APIRoute = async () => {
  const posts = sortPosts(await getCollection('blog'));

  const index = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    category: post.data.category,
    tags: post.data.tags,
    date: formatDate(post.data.pubDate),
    dateValue: post.data.pubDate.valueOf(),
    url: href(`/journal/${post.id}/`),
  }));

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
