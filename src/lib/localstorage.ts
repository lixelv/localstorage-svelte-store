import { browser } from '$app/environment';

export class LocalStorage<T> {
	key: string;

	constructor(key: string) {
		this.key = key;
	}

	set(value: T): void {
		if (browser) {
			localStorage.setItem(this.key, JSON.stringify(value));
		}
	}

	update(update_function: (arg0: T) => T): void {
		if (browser) {
			this.set(update_function(this.get() as T));
		}
	}

	remove(): void {
		if (browser) {
			localStorage.removeItem(this.key);
		}
	}

	get(): T | undefined {
		if (browser) {
			const result = JSON.parse(localStorage.getItem(this.key) as string);
			return result ? result : undefined;
		}
	}
}
