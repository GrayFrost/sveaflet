import type Mdsvex from '*.md';

const basename = (path: string) => path.split('/').pop()?.split('.').shift() ?? '';
const filePath = (path: string) => '/' + basename(path);
const sortByList = (order: string[]) => (a: [string, any], b: [string, any]) =>
	[a[0], b[0]]
		.map((x) => order.indexOf(basename(x)))
		.reduce((x, y) => (x < 0 ? 1 : y < 0 ? -1 : x - y));

export const fetchMarkdownPosts = async () => {
	const pageFiles = import.meta.glob<Mdsvex>('/src/routes/docs/pages/*.md');
	const componentFiles = import.meta.glob<Mdsvex>('/src/routes/docs/components/*.md');
	const exampleFiles = import.meta.glob<Mdsvex>('/src/routes/docs/examples/*.md');
	const extraFiles = import.meta.glob<Mdsvex>('/src/routes/docs/extra/*.md');

	const iterablePageFiles = Object.entries(pageFiles);
	const iterableComponentFiles = Object.entries(componentFiles);
	const iterableExampleFiles = Object.entries(exampleFiles);
	const iterableExtraFiles = Object.entries(extraFiles);

	const pageOrder: string[] = ['introduction', 'quick-start'];
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
			};
		})
	);
	const exampleOrder: string[] = [
		'sveaflet-quick-start-guide',
		'markers-with-custom-icons',
		'using-geojson-with-sveaflet',
		'interactive-choropleth-map',
		'layer-groups-and-layers-control',
		'zoom-levels',
		'non-geographical-maps',
		'wms'
	];
	const allExamples = await Promise.all(
		iterableExampleFiles.sort(sortByList(exampleOrder)).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			return {
				meta: metadata,
				path: filePath(path)
			};
		})
	);

	const allExtras = await Promise.all(
		iterableExtraFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			return {
				meta: metadata,
				path: filePath(path)
			};
		})
	)

	return {
		pages: allPages,
		components: allComponents,
		examples: allExamples,
		extra: allExtras,
	};
};
