import { BASE_API_URI } from '$lib/constants';
import { messages } from '$lib/store/message.store';
import { session } from '$lib/store/user.store';
import type { Message } from '$lib/types/message.interface';
import type { PageLoad } from '.svelte-kit/types/src/routes/chat/$types';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const load: PageLoad = async ({ fetch, params }) => {
	const $session = get(session);
	if (!$session.isAuthenticated) {
		throw redirect(307, '/');
	} else {
		const chat_res = await fetch(
			`${BASE_API_URI}/chat/${params.username}/?username=${$session.user.username}&id=${$session.user.pk}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			}
		);
		const constext = chat_res.ok && (await chat_res.json());
		const messageList: Array<Message> = JSON.parse(constext.messages).map((message: any) => {
			return {
				message: message.fields.message,
				thread_name: message.fields.thread_name,
				timestamp: message.fields.timestamp,
				sender__pk: message.fields.sender__pk,
				sender__username: message.fields.sender__username,
				sender__last_name: message.fields.sender__last_name,
				sender__first_name: message.fields.sender__first_name,
				sender__email: message.fields.sender__email,
				sender__is_staff: message.fields.sender__is_staff,
				sender__is_active: message.fields.sender__is_active,
				sender__is_superuser: message.fields.sender__is_superuser
			};
		});
		messages.set(messageList);
		return {
			context: constext
		};
	}
};
