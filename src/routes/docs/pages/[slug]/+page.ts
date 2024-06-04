export async function load({ params }) {
  const post = await import(`../${params.slug}.md`);
  console.log('zzh post', post);
  const { title, dir } = post.metadata;
  const content = post.default;

  return {
    content,
    title,
    dir
  };
}