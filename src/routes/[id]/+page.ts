import type {PageLoad} from "./$types";
import articles from "$lib/articles";
import { error } from '@sveltejs/kit';
export const load: PageLoad = async ({ params }) => {
	const id= params.id;
	//console.log(articles)
	if (id in articles) {
		return { ...articles[id] };
	}
	throw error(404, 'Article not found')
};