<script lang="ts">
	import { LocalStorageStore } from '$lib/store.js';

	const data = new LocalStorageStore<Array<string>>('newkey');

	if ($data === undefined) {
		$data = [];
	}

	let value = '';
</script>

<div class="mb-4 grid gap-1">
	{#each $data as item}
		<div>
			{item}
			<button
				on:click={() => data.update((v) => v.filter((i) => i !== item))}
				class="rounded-md border-2 border-gray-300 bg-slate-200">Delete</button
			>
		</div>
	{/each}
</div>
<form
	on:submit|preventDefault={() => {
		data.update((v) => [...v, value]);
		value = '';
	}}
>
	<input bind:value class="rounded-md border-2 border-gray-300 bg-slate-200" />
	<button type="submit" class="rounded-md border-2 border-gray-300 bg-slate-200">Add</button>
</form>
