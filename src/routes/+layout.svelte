<script lang="ts">
	import '/src/app.pcss';
	import Icon from '@iconify/svelte';
	import Menu from '$lib/Menu.svelte';

	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter',
		'dim',
		'nord',
		'sunset'
	];
</script>

<svelte:head>
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@yosshipaopao" />
	<script src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</svelte:head>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<div class="navbar bg-neutral sticky top-0 z-10 max-w-full">
			<div class="flex-1">
				<a href="/" class="btn btn-ghost text-xl">
					<span class="sm:hidden">YOSSHIPAOPAO</span>
					<span class="hidden sm:inline">YOSSHIPAOPAOのぶろぐ</span>
				</a>
			</div>
			<div class="flex-none">
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="btn m-1">
						Theme
						<svg
							width="12px"
							height="12px"
							class="h-2 w-2 fill-current opacity-60 inline-block"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 2048 2048"
						>
							<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
						</svg>
					</div>
					<ul
						tabindex="0"
						class="dropdown-content max-h-80 overflow-y-scroll p-2 shadow-2xl bg-base-300 rounded-box w-52"
					>
						{#each themes as theme}
							<li data-theme={theme}>
								<input
									type="radio"
									name="theme-dropdown"
									class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
									aria-label={theme}
									value={theme}
								/>
							</li>
						{/each}
					</ul>
				</div>
				<label for="my-drawer" class="btn btn-ghost btn-square lg:hidden">
					<Icon icon="mdi:menu" inline class="h-8 w-8" />
				</label>
			</div>
		</div>
		<main class="min-h-screen max-w-screen-lg mx-auto">
			<div class="w-full max-w-5xl mx-auto my-6 px-0 sm:px-6 flex gap-2 justify-center">
				<article class="w-full prose prose-xl prose-neutral sm:prose-xl max-w-screen-2xl">
					<slot />
				</article>
				<aside class="ml-auto w-1/3 h-screen hidden lg:block">
					<Menu />
				</aside>
			</div>
		</main>
	</div>
	<div class="drawer-side z-20">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<Menu mode="drawer" />
	</div>
</div>
<footer class="footer p-10 bg-neutral text-neutral-content">
	<aside>&copy; 2023 YOSSHIPAOPAO</aside>
	<nav>
		<header class="footer-title">Social</header>
		<div class="grid grid-flow-col gap-4">
			<a href="https://x.com/yosshipaopao">
				<Icon icon="mdi:twitter" inline class="h-8 w-8" />
			</a>
			<a href="https://github.com/yosshipaopao">
				<Icon icon="mdi:github" inline class="h-8 w-8" />
			</a>
			<a href="https://youtube.com/yosshipaopao">
				<Icon icon="mdi:youtube" inline class="h-8 w-8" />
			</a>
			<a href="https://misskey.io/@yosshipaopao">
				<Icon icon="simple-icons:misskey" inline class="h-8 w-8" />
			</a>
		</div>
	</nav>
</footer>
