export interface Message {
	message: string;
	thread_name: string;
	timestamp: string;
	sender__pk: number;
	sender__username: string;
	sender__last_name: string;
	sender__first_name: string;
	sender__email: string;
	sender__is_staff: boolean;
	sender__is_active: boolean;
	sender__is_superuser: boolean;
}
