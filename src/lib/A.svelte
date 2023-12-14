<script lang="ts">
	const href: string = $$props.href;
	let data: HTMLAnchorElement;
	const youtubeId = href
		.replace('https://www.youtube.com/watch?v=', '')
		.replace('https://youtu.be/', '')
		.replace('https://www.youtube.com/embed/', '');
</script>

{#if data?.innerText === href}
	{#if !youtubeId.startsWith('https://')}
		<iframe
			width="560"
			height="315"
			src={'https://www.youtube-nocookie.com/embed/' + youtubeId}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
			class="max-w-[100vw]"
		></iframe>
	{:else if href.startsWith('https://twitter.com')}
		<blockquote class="twitter-tweet">
			<a {href}>{href}</a>
		</blockquote>
	{/if}
{/if}

<a {href} {...$$props} bind:this={data} target="_blank">
	<slot />
</a>
