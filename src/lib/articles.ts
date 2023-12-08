import { load } from 'js-yaml';

interface Article {
	title: string;
	description?: string;
	image?: string;
	published: boolean;
	tags: string[];
	date: Date;
	content: string;
}

export interface Routes {
	id: string;
	title: string;
	description: string;
	image?: string;
	tags: string[];
	date: Date;
	published: boolean;
}

const articles: { [key: string]: Article } = {};
const paths = import.meta.glob('/articles/*.md', { as: 'raw', eager: true });
for (const path in paths) {
	const file = paths[path];
	const meta = load(file.split('---')[1]) as Article;
	if (!meta.published) continue;
	articles[path.replace('/articles/', '').replace('.md', '')] = {
		...meta,
		content: file.split('---').splice(2).join('---')
	};
}
export default articles;

export const routes = Object.keys(articles)
	.map(
		(id) =>
			({
				id,
				description: articles[id].description,
				title: articles[id].title,
				published: articles[id].published,
				tags: articles[id].tags,
				date: articles[id].date,
				image: articles[id].image
			}) as Routes
	)
	.sort((a, b) => b.date.getTime() - a.date.getTime());
