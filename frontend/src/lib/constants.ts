import type { User } from '$lib/types/user.interface';

export const BASE_API_URI = import.meta.env.DEV
	? import.meta.env.VITE_BASE_API_URI_DEV
	: import.meta.env.VITE_BASE_API_URI_PROD;

export const BASE_URI = BASE_API_URI.split('/api')[0];

export const BASE_URI_DOMAIN = BASE_API_URI.split('//')[1].split('/api')[0];

export const isEmpty = (obj: User | null | undefined) => {
	if (obj === undefined || obj === null) {
		obj = {};
	}
	return Object.keys(obj).length === 0;
};

export const timeSince = (dateString: string) => {
	const date = new Date(dateString);
	const newDate = new Date();

	const seconds = Math.floor((newDate.valueOf() - date.valueOf()) / 1000);

	let interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + ' years ago';
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + ' months ago';
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + ' days ago';
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + ' hours ago';
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + ' minutes ago';
	}
	return Math.floor(seconds) + ' seconds ago';
};
