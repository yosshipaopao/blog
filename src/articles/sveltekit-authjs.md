---
title: 'SvelteKitとAuthJsを使ってOAuthログイン機能を作る'
tags: [sveltekit, tech]
published: true
date: 2023-09-12
---

## はじめに

https://github.com/nextauthjs/next-auth
SvelteKitでOAuth認証を使うとなると今のところ自力で実装するか[AuthJs](https://authjs.dev/)しか選択肢がないと思います。（sk-authはメンテされてなくAuthJsとほぼ同じ）
一応[Supabase](https://supabase.com/docs/guides/auth/auth-helpers/sveltekit)とSvault
https://github.com/oslabs-beta/Svault
がありますが、プロバイダが少なかったりします。
:::message
追記
luciaがあるらしいです！
https://lucia-auth.com
プロバイダも多いのでこちらもありかも！
:::

~~Google,GitHub,DiscordだけだったらSvaultのほうがいいのかもしれない~~
使いましょうAuthJs。
https://authjs.dev/
機能的にはNextAuthベースなのでプロバイダとかを簡単に設定できます。

基本的には[document](https://authjs.dev/reference/sveltekit)をなぞればいいだけですがたまに[next-authのまま](https://authjs.dev/guides)だったり、わかりにくかったりするので一応簡単に説明します。

---

## 準備

インスコ

```shell
npm install @auth/core @auth/sveltekit
```

:::message
User情報をデータベースに保存する前提で説明します。
JWT tokenを利用する場合は必要ありません。
:::

### データベース用Adapter

AuthJsがもともと用意しているAdapter

```shell
npm i @auth/<任意>-adapter
```

https://authjs.dev/reference/adapters

Adapterを自作
https://authjs.dev/guides/adapters/creating-a-database-adapter

### データベース構造

各自のデータベースにあわせて設定して下さい
![](/images/sveltekit-authjs/database.png)

---

## 設定

プロバイダはそれごとに違うので省略しますが、だいたい`.env`に`clientId`と`clientSecret`置いとけばどうにかなります
詳しくは
https://authjs.dev/reference/core/providers_oauth

:::details src/hooks.server.ts

```typescript
import {
	AUTH_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET
} from '$env/static/private';
import Google from '@auth/core/providers/google';
const auth = SvelteKitAuth(async ({ locals }) => {
	return {
		adapter: Adapter(db), //JWTの場合不要
		providers: [
			Google({
				clientId: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET
			}),
			GitHub({
				clientId: GITHUB_CLIENT_ID,
				clientSecret: GITHUB_CLIENT_SECRET
			})
		],
		secret: AUTH_SECRET,
		trustHost: true,
		callbacks: {
			session: async ({ session, user }) => {
				//idとかをSessionに含める場合
				if (session.user) {
					session.user.id = user.id;
					//session.user.role="admin"
				}
				return session;
			}
		},
		pages: {
			signIn: '/signIn', //`signIn()`(プロバイダ指定なし)の時に飛ぶ
			newUser: '/setup', //初ログインの時にリダイレクトする。,
			error: '/auth/error' //認証中のエラー発生時にリダイレクト
		}
	};
}) satisfies Handle;

export const handle = sequence(auth);
```

:::

:::details src/routes/+layout.server.ts

```typescript
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		session: await locals.getSession()
	};
}) satisfies LayoutServerLoad;
```

:::

https://authjs.dev/getting-started/typescript
:::details Sessionの型を追加

```typescript
import { DefaultSession } from '@auth/core/types';
declare module '@auth/core/types' {
	interface Session {
		user: {
			//id等を追加する場合
			id: string;
		} & DefaultSession.user;
	}
}
```

:::

ログインページの例

```html
<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>
{#if $page.data.session?.user}
<h1>Welcome {$page.data.session.user.name}</h1>
<button on:click="{signOut}">SignOut</button>
{:else}
<h1>Select provider to sign in</h1>
<button on:click="{()" ="">signIn("google")}>Google</button>
<button on:click="{()" ="">signIn("github")}>GitHub</button>
{/if}
```

---

## ページ保護

:::details ページごとに保護する
https://authjs.dev/reference/sveltekit#handling-authorization

```typescript
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) throw redirect(303, '/auth');
	return {};
};
```

:::

:::details パスごとに
https://authjs.dev/reference/sveltekit#handling-authorization

```typescript
const protect = (async ({ event, resolve }) => {
	const protectedPages = ['/protected', '/admin'];
	if (protectedPages.some((s) => event.url.pathname.startsWith(s))) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/signIn');
		}
	}
	return resolve(event);
}) satisfies Handle;
export const handle = sequence(auth, protect);
```

:::

:::message
+layout.server.tsで保護をしないでくださいとのこと
:::

## おわり

さすがNextAuth簡単ですね。
Svelte大好き人間なのでライブラリが増えれば増えるほど俺が喜びます。任せた。
ほな
