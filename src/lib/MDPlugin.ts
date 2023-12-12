import type { Plugin } from 'svelte-exmarkdown';
import A from '$lib/A.svelte';
import IMG from '$lib/IMG.svelte';
import { gfmPlugin } from 'svelte-exmarkdown/gfm';
import rehypeHighlight from 'rehype-highlight';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import xml from 'highlight.js/lib/languages/xml';
import rehypeRaw from 'rehype-raw';

export const plugins: Plugin[] = [
	{
		renderer: { a: A, img: IMG }
	},
	gfmPlugin(),
	{
		rehypePlugin: [
			rehypeRaw,
			rehypeHighlight,
			{ ignoreMissing: true, languages: { typescript, xml, python } }
		]
	}
];
