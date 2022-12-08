<script lang="ts">
	import { goto } from '$app/navigation';
	import { BASE_API_URI } from '$lib/constants';
	import { session } from '$lib/store/user.store';

	let username: string, password: string, error: string;

	const currentYear = new Date().getFullYear();
	const handleLogin = () => {
		const headers = new Headers();
		headers.append('X-CSRFToken', $session.csrf);
		headers.append('Content-Type', 'application/json');
		fetch(`${BASE_API_URI}/login/`, {
			method: 'POST',
			headers: headers,
			credentials: 'include',
			body: JSON.stringify({ username: username, password: password })
		})
			.then((res) => {
				if (!res.ok) {
					return res.text().then((text) => {
						error = text;
						console.error(text);
					});
				} else {
					return res.json();
				}
			})
			.then((data) => {
				$session.isAuthenticated = true;
				$session.user.pk = data.user[0].pk;
				$session.user.email = data.user[0].fields.email;
				$session.user.username = data.user[0].fields.username;
				$session.user.first_name = data.user[0].fields.first_name;
				$session.user.last_name = data.user[0].fields.last_name;
				$session.user.last_login = data.user[0].fields.last_login;
				$session.user.is_active = data.user[0].fields.is_active;
				$session.user.is_staff = data.user[0].fields.is_staff;
				$session.user.is_superuser = data.user[0].fields.is_superuser;
				$session.user.date_joined = data.user[0].fields.date_joined;

				goto('/chat');
			})
			.catch((err) => {
				console.log(err);
				$session.error = 'Wrong username or password.';
			});
	};
</script>

<main class="form-signin">
	<form on:submit|preventDefault={handleLogin} method="POST">
		<h1 class="h3 mb-3 fw-normal text-center">Please sign in</h1>
		{#if error}
			<p class="text-danger text-center">{error}</p>
		{/if}
		<div class="form-floating">
			<input
				type="text"
				class="form-control"
				id="floatingInput"
				placeholder="Username"
				bind:value={username}
			/>
			<label for="floatingInput">Username</label>
		</div>
		<div class="form-floating">
			<input
				type="password"
				class="form-control"
				id="floatingPassword"
				bind:value={password}
				placeholder="Password"
			/>
			<label for="floatingPassword">Password</label>
		</div>

		<button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
		<p class="mt-5 mb-3 text-muted text-center">&copy; {currentYear}</p>
	</form>
</main>

<style>
	.form-signin {
		width: 100%;
		max-width: 330px;
		padding: 15px;
		margin: auto;
	}

	.form-signin .form-floating:focus-within {
		z-index: 2;
	}

	.form-signin input[type='text'] {
		margin-bottom: -1px;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}

	.form-signin input[type='password'] {
		margin-bottom: 10px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
</style>
