import type { Message } from '$lib/types/message.interface';
import { writable, type Writable } from 'svelte/store';

const newMessages = () => {
	const { subscribe, update, set }: Writable<Array<Message>> = writable([]);

	return { subscribe, update, set };
};

const messages = newMessages();

// const socket = new WebSocket('wss://dae9057c.ngrok.io');

// // Connection opened
// socket.addEventListener('open', function (_event) {
// 	console.log('Connection established!');
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
// 	messages.set(event.data);
// });

const sendMessage = (message: string, senderUsername: string, socket: WebSocket) => {
	if (socket.readyState <= 1) {
		socket.send(
			JSON.stringify({
				message: message,
				senderUsername: senderUsername
			})
		);
	}
};

export { messages, sendMessage };
