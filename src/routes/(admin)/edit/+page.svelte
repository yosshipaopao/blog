<script lang='ts'>
	import { plugins } from '$lib/MDPlugin.js';
	import { Markdown } from 'svelte-exmarkdown';

	let md: string = '';
</script>

<div class='flex w-screen h-screen bg-base-100'>
	<div class='w-full h-full'>
		<textarea placeholder='MarkDown' class='textarea textarea-bordered textarea-lg w-full h-screen'
							bind:value={md}></textarea>
	</div>
	<div class='w-full h-full prose overflow-y-scroll'>
		<Markdown md={md} {plugins} />
	</div>
</div>