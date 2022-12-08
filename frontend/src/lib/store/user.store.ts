import { get, writable, type Writable } from 'svelte/store';
import type { Session } from '$lib/types/user.interface';

const newSession = () => {
	const { subscribe, update, set }: Writable<Session> = writable({
		user: {},
		csrf: '',
		error: '',
		isAuthenticated: false
	});

	function setCSRF(csrf: string) {
		update(() => {
			const $session = get(session);
			$session.csrf = csrf;
			return {
				user: $session.user,
				csrf: $session.csrf,
				error: $session.error,
				isAuthenticated: $session.isAuthenticated
			};
		});
	}
	function setIsAuthenticated(isAuthenticated: boolean) {
		update(() => {
			const $session = get(session);

			$session.isAuthenticated = isAuthenticated;

			return {
				user: $session.user,
				csrf: $session.csrf,
				error: $session.error,
				isAuthenticated: $session.isAuthenticated
			};
		});
	}

	return { subscribe, update, set, setCSRF, setIsAuthenticated };
};

export const session = newSession();
