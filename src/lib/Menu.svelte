<script lang='ts'>
	import { routes, type Routes } from '$lib/articles';

	const tagRoutes: { [key: string]: Routes[] } = {};
	routes.toReversed().forEach(route => {
		route.tags.forEach(tag => {
			if (!tagRoutes[tag]) {
				tagRoutes[tag] = [];
			}
			if (tagRoutes[tag].length < 4) {
				tagRoutes[tag].push(route);
			}
		});
	});
	const tagRoutesArray = Object.entries(tagRoutes);
	export let mode: 'menu' | 'drawer' = 'menu';
	const baseClass = mode === 'menu' ? 'menu w-full bg-base-200 rounded-box sticky' : 'menu max-w-sm p-4 min-h-full bg-base-200 text-base-content';
</script>
<ul class='{baseClass}'>
	<li class='menu-title'>Latest</li>
	{#each routes.slice(0, 3) as route}
		<li>
			<a href='/{route.id}'>
				<span class='truncate'>{route.title}</span>
			</a>
		</li>
	{/each}
	<li class='menu-title'>Tags</li>
	{#each tagRoutesArray as tag}
		<li>
			<details>
				<summary>{tag[0]}</summary>
				<ul>
					{#each tag[1] as route}
						<li>
							<a href='/{route.id}'>
								<span class='truncate'>{route.title}</span>
							</a>
						</li>
					{/each}
				</ul>
			</details>
		</li>
	{/each}
</ul>