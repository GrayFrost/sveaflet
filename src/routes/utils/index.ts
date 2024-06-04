// import type Mdsvex from '*.md';

const basename = (path: string) => path.split('/').pop()?.split('.').shift() ?? '';
const filePath = (path: string) => '/' + basename(path);
const sortByList = (order: string[]) => (a: [string, any], b: [string, any]) => [a[0], b[0]].map((x) => order.indexOf(basename(x))).reduce((x, y) => (x < 0 ? 1 : y < 0 ? -1 : x - y));

export const fetchMarkdownPosts = async () => {

  const pageFiles = import.meta.glob<any>('/src/routes/docs/pages/*.md'); // todo typescript
  const componentFiles = import.meta.glob<any>('/src/routes/docs/components/*.md');

  const iterablePageFiles = Object.entries(pageFiles);
  const iterableComponentFiles = Object.entries(componentFiles);

  const pageOrder: string[] = ['introduction', 'quickstart', 'colors', 'customization', 'typescript', 'compiler-speed', 'how-to-contribute', 'license']; // todo
  const allPages = await Promise.all(
    iterablePageFiles.sort(sortByList(pageOrder)).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      return {
        meta: metadata,
        path: filePath(path)
      };
    })
  );
  const allComponents = await Promise.all(
    iterableComponentFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      return {
        meta: metadata,
        path: filePath(path)
      }
    })
  )

  return {
    pages: allPages,
    components: allComponents
  }
}