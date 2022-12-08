export interface User {
	pk?: number;
	email?: string;
	username?: string;
	last_login?: string;
	first_name?: string;
	last_name?: string;
	is_staff?: boolean;
	is_active?: boolean;
	date_joined?: string;
	is_superuser?: boolean;
}

export interface Session {
	user: User;
	csrf: string;
	error?: string;
	isAuthenticated: boolean;
}
