<script lang="ts">
	import type { PageData } from './$types';
	import { Markdown } from 'svelte-exmarkdown';
	import { plugins } from '$lib/MDPlugin';
	import { onMount } from 'svelte';

	import 'highlight.js/styles/github-dark.min.css';

	export let data: PageData;

	onMount(() => {
		// eslint-disable-next-line no-undef
		twttr.widgets.load();
	});
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="og:title" content={data.title} />
	<meta name="og:description" content={data.description ?? data.title} />
	<meta name="og:sitename" content="blog.yosshipaopao.com" />
	<meta name="og:type" content="article" />
	<meta name="og:url" content={`https://blog.yosshipaopao.com/${data.id}`} />
	<meta name="og:sitename" content="YOSSHIPAOPAOのぶろぐ" />
	<meta name="description" content={data.description ?? data.title} />
	<meta name="keywords" content={data.tags.join(',')} />
</svelte:head>
<div class="hero bg-base-200 mb-6 rounded-xl">
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
