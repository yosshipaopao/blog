<script lang='ts'>
	import { routes } from '$lib/articles';
</script>

<svelte:head>
	<title>YOSSHIPAOPAOのぶろぐ</title>
	<meta name='description' content='YOSSHIPAOPAOが適当なことを書きます' />
</svelte:head>
<div class='flex flex-col gap-10'>
	{#each routes as route}
		<a href='/{route.id}' class='card card-side bg-base-300 hover:border border-primary shadow-xl no-underline'>
			<figure class='w-48 object-cover'><img src='/no-image.webp' alt='Movie' /></figure>
			<div class='card-body p-2'>
				<h2 class='card-title my-5'>{route.title}</h2>
				{#if route.description}
					<p>{route.description}</p>
				{/if}
				<p>{route.date.toLocaleDateString()}</p>
				<div class='flex gap-2'>
					{#each route.tags as tag}
						<span class='badge badge-primary'>{tag}</span>
					{/each}
				</div>
			</div>
		</a>
	{/each}
</div>
<style>
	.card-body > p {
			margin: 0 0 0.5rem 0;
	}
</style>