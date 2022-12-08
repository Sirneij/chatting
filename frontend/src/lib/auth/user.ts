import { BASE_API_URI } from '$lib/constants';
import { session } from '$lib/store/user.store';
import { get } from 'svelte/store';

export const getCSRF = () => {
	fetch(`${BASE_API_URI}/csrf/`, {
		credentials: 'include'
	})
		.then((res) => {
			const csrfToken = res.headers.get('X-CSRFToken');
			if (csrfToken) {
				session.setCSRF(csrfToken);
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getSession = () => {
	fetch(`${BASE_API_URI}/session/`, {
		credentials: 'include'
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.isAuthenticated) {
				session.setIsAuthenticated(true);
			} else {
				session.setIsAuthenticated(false);
				getCSRF();
			}
		})
		.catch((err) => {
			console.log(err);
		});
};
