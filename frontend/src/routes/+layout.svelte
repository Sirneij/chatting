<script lang="ts">
	import { getSession } from '$lib/auth/user';
	import '$lib/dist/css/all.min.css';
	import '$lib/dist/css/bootstrap.min.css';
	import '$lib/dist/css/styles.css';
	import { onMount } from 'svelte';

	onMount(() => {
		getSession();
	});
	
</script>

<slot />
