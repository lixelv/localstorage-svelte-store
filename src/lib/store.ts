import { type Writable, writable } from 'svelte/store';
import { browser } from '$app/environment';

import { LocalStorage } from '$lib/localstorage.js';

export class LocalStorageStore<T> implements Writable<T> {
	#valueStore: Writable<T>;
	#localstorage: LocalStorage<T>;

	constructor(key: string, value: T | undefined = undefined) {
		this.#localstorage = new LocalStorage(key);

		if (value === undefined) {
			if (browser) {
				value = this.#localstorage.get() as T | undefined;
			}
		}

		this.#valueStore = writable(value);
	}

	update(update_function: (arg0: T) => T): void {
		this.#valueStore.update(update_function);
		this.#localstorage.update(update_function);
	}

	set(value: T): void {
		this.#valueStore.set(value);
		this.#localstorage.set(value);
	}

	subscribe(run: (arg0: T) => void): () => void {
		return this.#valueStore.subscribe(run);
	}
}
