import { fetchMarkdownPosts } from '../../utils/index.ts';
import { json } from '@sveltejs/kit';

export const GET = async () => {
  const allPosts = await fetchMarkdownPosts();
  return json(allPosts);
};