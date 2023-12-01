<script lang="ts">
	import type { PageData } from './$types';
	import type { Plugin } from 'svelte-exmarkdown';
	import { Markdown } from 'svelte-exmarkdown';
	import rehypeHighlight from 'rehype-highlight';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import 'highlight.js/styles/github.css';
	import typescript from 'highlight.js/lib/languages/typescript';
	import A from '$lib/A.svelte';

	export let data: PageData;

	const plugins: Plugin[] = [
		{
			renderer: { a: A }
		},
		gfmPlugin(),
		{
			rehypePlugin: [rehypeHighlight, { ignoreMissing: true, languages: { typescript } }]
		}
	];
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description ?? data.title} />
	<meta name="keywords" content={data.tags.join(',')} />
</svelte:head>
<div class="hero h-52 bg-base-200 mb-6 rounded-xl">
	<div class="hero-content text-center">
		<div>
			<h1>{data.title}</h1>
			{#if data.description}
				<p>{data.description}</p>
			{/if}
			<p>{data.date.toLocaleDateString()}</p>
			<div class="flex justify-center gap-2">
				{#each data.tags as tag}
					<span class="badge badge-primary">{tag}</span>
				{/each}
			</div>
		</div>
	</div>
</div>
<Markdown md={data.content} {plugins} />
