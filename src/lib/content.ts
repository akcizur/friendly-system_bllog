import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export function sortPosts(posts: Post[]) {
  return [...posts]
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getFeaturedPost(posts: Post[]) {
  return sortPosts(posts).find((post) => post.data.featured) ?? sortPosts(posts)[0];
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function href(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path === '/') return `${base}/`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function uniqueValues(posts: Post[], key: 'category' | 'tags') {
  const values = posts.flatMap((post) => key === 'category' ? [post.data.category] : post.data.tags);
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function getRelatedPosts(post: Post, posts: Post[], limit = 3) {
  const candidates = sortPosts(posts).filter((item) => item.id !== post.id);

  return candidates
    .map((item) => {
      const sharedTags = item.data.tags.filter((tag) => post.data.tags.includes(tag)).length;
      const sameCategory = item.data.category === post.data.category ? 2 : 0;
      return { item, score: sharedTags * 3 + sameCategory };
    })
    .sort((a, b) => b.score - a.score || b.item.data.pubDate.valueOf() - a.item.data.pubDate.valueOf())
    .slice(0, limit)
    .map(({ item }) => item);
}

export function getAdjacentPosts(post: Post, posts: Post[]) {
  const ordered = sortPosts(posts);
  const index = ordered.findIndex((item) => item.id === post.id);

  return {
    newer: index > 0 ? ordered[index - 1] : undefined,
    older: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}
